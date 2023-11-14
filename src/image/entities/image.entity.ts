import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

export type UserDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  _id: string;

  @Prop({ required: true })
  image: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  postId: Post;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
