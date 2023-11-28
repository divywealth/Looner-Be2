import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from '../../post/entities/post.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import { PostLike } from 'src/post-like/entities/post-like.entity';
import { PostComment } from 'src/post-comment/entities/post-comment.entity';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true }) // Add the _id field
  _id: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  profilepic: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Post', }] })
  posts: Post[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostLike', }] })
  postLikes: PostLike[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment', }] })
  postComments: PostComment[];

  @Prop({ default: Date.now })
  createdAt!: Date; 

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
