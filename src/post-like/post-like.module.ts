import { Module } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { PostLikeController } from './post-like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostLike, PostLikeSchema } from './entities/post-like.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Post, PostSchema } from 'src/post/entities/post.entity';
import { Image, ImageSchema } from 'src/image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostLike.name, schema: PostLikeSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Image.name, schema: ImageSchema }
    ]),
  ],
  controllers: [PostLikeController],
  providers: [PostLikeService]
})
export class PostLikeModule {}
