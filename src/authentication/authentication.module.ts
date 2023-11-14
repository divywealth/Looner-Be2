import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { VerificationService } from 'src/verification/verification.service';
import {
  Verification,
  VerificationSchema,
} from 'src/verification/entities/verification.entity';
import { NotificationService } from 'src/Services/NotificationService';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Verification.name, schema: VerificationSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    CloudinaryService,
    UserService,
    VerificationService,
    NotificationService,
  ],
})
export class AuthenticationModule {}
