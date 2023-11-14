import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Post, PostSchema } from './entities/post.entity';
import { Image, ImageSchema } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema}, { name: Image.name, schema: ImageSchema}]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [PostController],
  providers: [PostService, ImageService, CloudinaryService]
})
export class PostModule {}
