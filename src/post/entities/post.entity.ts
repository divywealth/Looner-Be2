import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';

export type UserDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  _id: string;

  @Prop()
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: User

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  })
  imageId: Image[]

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
