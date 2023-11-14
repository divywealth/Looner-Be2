import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UsePipes, ValidationPipe, UploadedFiles, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload-dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1'
})
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService
    ) {}

  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto
  })

  @Post('post')
  @UsePipes(ValidationPipe)
  async create(@Body() body, @UploadedFiles() file: Array<Express.Multer.File>, @Req() request: Request ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId: string = decodedToken.user._id;
      const createPostDto: CreatePostDto = {
        text: body.text,
        file: file,
      }
      return this.postService.create(createPostDto, userId);
    } catch (error) {
      throw error.message
    }
  }

  @Get('posts')
  findAll() {
    try {
      return this.postService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get('post/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.postService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('post/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postService.update(id, updatePostDto);
    } catch (error) {
      throw error.message
    }
  }

  @Delete('post/:id')
  remove(@Param('id') id: string) {
    try {
      return this.postService.remove(id);
    } catch (error) {
      throw error.message
    }
  }
}
