import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);