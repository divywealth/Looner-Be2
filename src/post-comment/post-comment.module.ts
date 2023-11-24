import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostComment, PostCommentSchema } from './entities/post-comment.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Post, PostSchema } from 'src/post/entities/post.entity';
import { Image, ImageSchema } from 'src/image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostComment.name, schema: PostCommentSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema},
      { name: Image.name, schema: ImageSchema }
    ]),
  ],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
