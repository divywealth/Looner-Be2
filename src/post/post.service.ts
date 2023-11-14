import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './entities/post.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class PostService {

  constructor (
    @InjectModel(Post.name)
    private readonly postModel: mongoose.Model<Post>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService
  ) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    try {
      let files: any = []
      console.log(createPostDto.file, createPostDto.file.length)
      for (let i = 0; i < createPostDto.file.length; i++) {
        const upload = await this.cloudinaryService.uploadImage(createPostDto.file[i])
        files.push(upload.url)
      }
      const post = await this.postModel.create({
        text: createPostDto.text,
        userId: userId
      })
      for(let i = 0; i < files.length; i++) {
        const image = await this.imageService.create(files[i], post._id);
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    try {
      return this.postModel.find().populate('userId')
    } catch (error) {
      throw error
    }
  }

  findOne(id: string) {
    try {
      return this.postModel.findById(id)
    } catch (error) {
      throw error
    }
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return this.postModel.findOneAndUpdate({_id: id}, updatePostDto)
    } catch (error) {
      throw error
    }
  }

  remove(id: string) {
    try {
      return this.postModel.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }
}
