import { Injectable } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { PostLike } from './entities/post-like.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class PostLikeService {

  constructor(
    @InjectModel(PostLike.name)
    private readonly postLikeModel: mongoose.Model<PostLike>
  ) {}

  async create(createPostLikeDto: CreatePostLikeDto, userId: string): Promise<PostLike | null> {
    try {
      const createdPostLike = new this.postLikeModel({
        userId: userId,
        postId: createPostLikeDto.postId
      })
      return await createdPostLike.save()
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<PostLike[] | null> {
    try {
      return await this.postLikeModel.find()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<PostLike | null> {
    try {
      return await this.postLikeModel.findById(id);
    } catch (error) {
      throw error
    }
  }

  update(id: number, updatePostLikeDto: UpdatePostLikeDto) {
    try {
      
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    try {
      
    } catch (error) {
      throw error
    }
  }
}
