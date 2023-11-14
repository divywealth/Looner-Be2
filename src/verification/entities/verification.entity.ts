import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

export type UserDocument = HydratedDocument<Verification>;

@Schema()
export class Verification {

  _id: string;
  
  @Prop()
  verificationCode: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
