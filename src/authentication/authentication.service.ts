import { ResetPasswordDto } from './dto/reset-password.dto';
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

@Injectable()
export class AuthenticationService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
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
      const createdUser = await this.userModel.create(information2Save);
      return {
        user: createdUser,
        access_token: await this.jwtService.signAsync({ user: createdUser }),
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

  async sendResetPasswordCode(email: string) {
    try {
      const existingUser = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
      if (!existingUser) {
        return BadRequest('No user with this email exist');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async verifyResetPasswordCode() {
    try {
      
    } catch (error) {
      throw error
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
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
        email: resetPasswordDto.email
      }
      return await this.userModel.findOneAndUpdate(filter, {password: password})
    } catch (error) {
      throw error
    }
  }

  async updatePassword(updatePasswordDto: UpdatePassworDto, user: User) {
    try {
      if (!(await bcrypt.compare(updatePasswordDto.currentpassword, user.password))) {
        return BadRequest('Current password not correct')
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updatePasswordDto.newpassword, saltRounds);
      const filter = {
        email: user.email
      }
      const updatePassword = {
        password: hashedPassword
      }
      return this.userModel.findOneAndUpdate(filter, updatePassword)
    } catch (error) {
      throw error
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
        _id: id
      }
      return this.userModel.findOneAndDelete(filter);
    } catch (error) {
      throw error;
    }
  }
}
