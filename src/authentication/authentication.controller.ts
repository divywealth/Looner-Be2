import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ProfilePicUploadDto } from './dto/profile-pic-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePassworDto } from './dto/update-password.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyPasswordCodeDto } from './dto/reset-password.dto';
import { User } from 'src/user/entities/user.entity';

@Controller({
  version: '1'
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private readonly userService: UserService
    ) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: ProfilePicUploadDto,
  })

  @UseInterceptors(FileInterceptor('file'))
  @Post('create-user')
  create(@Body() body, @UploadedFile() file: Express.Multer.File) {
    try {
      const createUserDto: CreateUserDto = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phoneNo: body.phoneNo,
        username: body.username,
        file: file,
        dob: body.dob,
        password: body.password
      }
      return this.authenticationService.create(createUserDto)
    } catch (error) {
      throw error.message
    }
  }
  
  @Post('signin')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authenticationService.loginUser(loginUserDto);
    } catch (error) {
      throw error.message
    }
  }

  @Post('forgetpassword')
  sendResetPasswordCode(@Body() verifyPasswordCodeDto: VerifyPasswordCodeDto): Promise<string> {
    try {
      return this.authenticationService.sendResetPasswordCode(verifyPasswordCodeDto.email)
    } catch (err) {
      throw err.message
    }
  }

  @Post('verifypasscode')
  verifyPasswordCode(@Body() verifyPasswordCodeDto: VerifyPasswordCodeDto) {
    try {
      return this.authenticationService.verifyResetPasswordCode(verifyPasswordCodeDto)
    } catch (error) {
      throw error.message
    }
  }

  @Patch('reset-password')
  @UsePipes(ValidationPipe)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<User | null> {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto)
    } catch (error) {
      throw error.message
    }
  }

  @Patch('update-password')
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() updatePasswordDto: UpdatePassworDto, @Req() request: Request): Promise<User | null> {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      const existingUser = await this.userService.findOne(userId)
      return this.authenticationService.updatePassword(updatePasswordDto, existingUser)
    }catch (error) {
      throw error.message
    }
  }

  @Patch('update-user/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User | null> {
    try {
      updateUserDto.file = file;
      return this.authenticationService.update(id, updateUserDto); 
    } catch (err) {
      throw err.message
    }
  }

  @Delete('delete-user/:id')
  remove(@Param('id') id: string): Promise<User | null> {
    try {
      return this.authenticationService.remove(id);
    } catch (error) {
      throw error.message
    }
  }
}
