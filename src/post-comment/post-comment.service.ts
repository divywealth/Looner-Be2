import { Injectable } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostComment } from './entities/post-comment.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectModel(PostComment.name)
    private readonly postCommentModel: mongoose.Model<PostComment>
  ) {}

  async create(createPostCommentDto: CreatePostCommentDto, userId: string): Promise<PostComment> {
    try {
      const createdPostComment = new this.postCommentModel({
        userId: userId,
        postId: createPostCommentDto.postId,
        comment: createPostCommentDto.comment
      });
      return await createdPostComment.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<PostComment[] | null> {
    try {
      return await this.postCommentModel.find();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<PostComment | null> {
    try {
      return await this.postCommentModel.findById(id);
    } catch (error) {
      throw error
    }
  }

  update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    return `This action updates a #${id} postComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} postComment`;
  }
}
