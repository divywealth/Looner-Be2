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
    private readonly postCommentModel: mongoose.Model<PostLike>
  ) {}

  create(createPostLikeDto: CreatePostLikeDto, userId: string): Promise<PostLike> {
    try {
      
    } catch (error) {
      throw error
    }
  }

  findAll() {
    try {
      
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    try {
      
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
