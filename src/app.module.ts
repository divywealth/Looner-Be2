import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { VerificationModule } from './verification/verification.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthenticationModule,
    PostModule,
    ImageModule,
    CloudinaryModule,
    VerificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 