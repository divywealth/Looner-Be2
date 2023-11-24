import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

export type PostLikeDocument = HydratedDocument<PostLike>

@Schema()
export class PostLike {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true }) // Add the _id field
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: Post;

  @Prop({ default: Date.now })
  createdAt!: Date; 

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);
