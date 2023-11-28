import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { Request } from 'express';
import { PostComment } from './entities/post-comment.entity';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1'
})
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService, private jwtService: JwtService,) {}

  @Post('post-comment')
  async create(@Body() createPostCommentDto: CreatePostCommentDto, @Req() request: Request,): Promise<PostComment> {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      return this.postCommentService.create(createPostCommentDto, userId);
    } catch (error) {
      throw error.message
    }
  }

  @Get('post-comments')
  findAll() {
    try {
      return this.postCommentService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get('post-comment/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.postCommentService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('post-comment/:id')
  update(@Param('id') id: string, @Body() updatePostCommentDto: UpdatePostCommentDto) {
    try {
      return this.postCommentService.update(+id, updatePostCommentDto);
    } catch (error) {
      throw error.message
    }
  }

  @Delete('post-comment/:id')
  remove(@Param('id') id: string) {
    try {
      return this.postCommentService.remove(+id);
    } catch (error) {
      throw error.message
    }
  }
}
