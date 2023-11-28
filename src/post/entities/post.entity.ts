import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image } from '../../image/entities/image.entity';
import { User } from '../../user/entities/user.entity';
import { PostLike } from 'src/post-like/entities/post-like.entity';
import { PostComment } from 'src/post-comment/entities/post-comment.entity';

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true }) // Add the _id field
  _id: string;

  @Prop()
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }] })
  images: Image[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostLike' }] })
  postLikes: PostLike[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }] })
  postComments: PostComment[];

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
