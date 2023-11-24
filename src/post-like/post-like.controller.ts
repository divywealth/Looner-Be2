import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { Request } from 'express';
import { PostLike } from './entities/post-like.entity';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1',
})
export class PostLikeController {
  constructor(
    private readonly postLikeService: PostLikeService,
    private jwtService: JwtService,
  ) {}

  @Post('post-like')
  async create(
    @Body() createPostLikeDto: CreatePostLikeDto,
    @Req() request: Request,
  ): Promise<PostLike> {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user.id;
      return this.postLikeService.create(createPostLikeDto, userId);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('post-likes')
  findAll() {
    try {
      return this.postLikeService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @Get('post-like/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.postLikeService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('post-like/:id')
  update(
    @Param('id') id: string,
    @Body() updatePostLikeDto: UpdatePostLikeDto,
  ) {
    try {
      return this.postLikeService.update(+id, updatePostLikeDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('post-like/:id')
  remove(@Param('id') id: string) {
    try {
      return this.postLikeService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
