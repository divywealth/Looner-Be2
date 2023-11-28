import * as SendGrid from '@sendgrid/mail';
import { Verification } from 'src/verification/entities/verification.entity';
import { randomNumber } from './../Services/randomNumber';
import { ResetPasswordDto, VerifyPasswordCodeDto } from './dto/reset-password.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { BadRequest } from 'src/Services/BadRequestResponse';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdatePassworDto } from './dto/update-password.dto';
import { VerificationService } from 'src/verification/verification.service';
import { CreateVerificationDto } from 'src/verification/dto/create-verification.dto';
import { NotificationService } from 'src/Services/NotificationService';

@Injectable()
export class AuthenticationService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    @InjectModel(Verification.name)
    private readonly verificationModel: mongoose.Model<Verification>,
    private jwtService: JwtService,
    private readonly verificationService: VerificationService,
    private notificationService: NotificationService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userModel.findOne({
        username: createUserDto.username,
        phoneNo: createUserDto.phoneNo,
        email: createUserDto.email,
      });
      if (existingUser) {
        return BadRequest(
          'username or phoneNo already have an account try choosing a unique username or phoneNo',
        );
      }
      const upload = await this.cloudinaryService.uploadImage(
        createUserDto.file,
      );
      const saltRounds: number = 10;
      const hashedPassword: string = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
      const information2Save = {
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        email: createUserDto.email,
        phoneNo: createUserDto.phoneNo,
        username: createUserDto.username,
        profilepic: upload.url,
        dob: createUserDto.dob,
        password: hashedPassword,
      };
      const createdUserOne = new this.userModel(information2Save)
      const createdUserTwo = await createdUserOne.save()
      console.log(createdUserTwo)
      return {
        user: createdUserTwo,
        access_token: await this.jwtService.signAsync({ user: createdUserTwo }),
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      if (!loginUserDto.phoneNo || !loginUserDto.password) {
        throw BadRequest('phoneNo and password required');
      }
      const existingUser = await this.userModel.findOne({
        phoneNo: loginUserDto.phoneNo,
      });
      if (!existingUser) {
        throw BadRequest(
          'sorry user with this phoneNo not found try creating an account instead',
        );
      } else if (
        !(await bcrypt.compare(loginUserDto.password, existingUser.password))
      ) {
        throw BadRequest('Incorrect Password');
      } else {
        return {
          user: existingUser,
          access_token: await this.jwtService.signAsync({ user: existingUser }),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async sendResetPasswordCode(email: string): Promise<string> {
    try {
      const existingUser = await this.userModel.findOne({
        email: email,
      });
      if (!existingUser) {
        return BadRequest('No user with this email exist');
      }
      const existingVerificationCode = await this.verificationModel.findOne({
        userId: existingUser._id,
      });
      if (existingVerificationCode) {
        const deleteVerification =
          await this.verificationService.removeUserVerification(existingUser);
      }
      const verificationCode = randomNumber(6);
      const createVerificationCode = await this.verificationService.create(
        existingUser,
        verificationCode,
      );
      //payload to send to email
     const emailPayload: SendGrid.MailDataRequired = {
       to: email,
       subject: 'Looner Reset Password',
       from: 'christianonuora1@gmail.com',
       text: 'Hello world from NestJs Sendgrid',
       html: `<h1>Hello ${existingUser.firstname} your verification code is ${verificationCode}</h1>`,
     };
     await this.notificationService.emailNotificationService(emailPayload);
     const message = `passcode has been sent to ${email}`;
     return message;
    } catch (error) {
      throw error;
    }
  }

  async verifyResetPasswordCode(verifyPasswordCodeDto: VerifyPasswordCodeDto) {
    try {
      const existingCode = await this.verificationModel.findOne({});
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User | null> {
    try {
      if (!resetPasswordDto.password) {
        return BadRequest('Password is required');
      }
      if (resetPasswordDto.password.length < 5) {
        return BadRequest(
          'Password is too short. Atleast 6 characters required',
        );
      }
      const saltOrRounds: number = 10;
      const password: string = await bcrypt.hash(
        resetPasswordDto.password,
        saltOrRounds,
      );
      const filter = {
        email: resetPasswordDto.email,
      };
      return await this.userModel.findOneAndUpdate(filter, {
        password: password,
      });
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(updatePasswordDto: UpdatePassworDto, user: User) {
    try {
      if (
        !(await bcrypt.compare(
          updatePasswordDto.currentpassword,
          user.password,
        ))
      ) {
        return BadRequest('Current password not correct');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updatePasswordDto.newpassword,
        saltRounds,
      );
      const filter = {
        email: user.email,
      };
      const updatePassword = {
        password: hashedPassword,
      };
      return this.userModel.findOneAndUpdate(filter, updatePassword);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const filter = {
        _id: id,
      };
      if (updateUserDto.file) {
        const upload = await this.cloudinaryService.uploadImage(
          updateUserDto.file,
        );
        const savefile = {
          profilepic: upload.url,
        };
        return this.userModel.findOneAndUpdate(filter, savefile);
      }
      return this.userModel.findOneAndUpdate(filter, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const filter = {
        _id: id,
      };
      return this.userModel.findOneAndDelete(filter);
    } catch (error) {
      throw error;
    }
  }
}
