import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { Verification } from 'src/verification/entities/verification.entity';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  _id: string

  @Prop({required: true})
  firstname: string;

  @Prop({required: true})
  lastname: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  phoneNo: string;

  @Prop({required: true})
  username: string;

  @Prop({required: false})
  profilepic: string;

  @Prop({required: true})
  dob: string;

  @Prop({required: true})
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  })
  post: Post[]

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);