import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class PostService {

  constructor (
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post | null> {
    try {
      let files: any = []
      console.log(createPostDto.file)
      if (createPostDto.file !== undefined) {
        console.log(createPostDto.file, createPostDto.file.length)
        for (let i = 0; i < createPostDto.file.length; i++) {
          const upload = await this.cloudinaryService.uploadImage(createPostDto.file[i])
          files.push(upload.url)
        }
       
        const post = await this.postModel.create({
          text: createPostDto.text,
          userId: userId,
        })
        for(let i = 0; i < files.length; i++) {
          const image = await this.imageService.create(files[i], post._id);
        } 
        return post
      }else {
        const createdpost = new this.postModel({
          text: createPostDto.text,
          userId: userId, 
        })
        return createdpost.save()
      }
    } catch (error) {
      throw error
    }
  }

  findAll(): Promise<Post[] | null> {
    try {
      return this.postModel.find().populate('images').exec()
    } catch (error) {
      throw error
    }
  }

  findOne(id: string): Promise<Post | null> {
    try {
      return this.postModel.findById(id).populate('images').exec()
    } catch (error) {
      throw error
    }
  }

  update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    try {
      return this.postModel.findOneAndUpdate({_id: id}, updatePostDto)
    } catch (error) {
      throw error
    }
  }

  remove(id: string): Promise<Post | null> {
    try {
      return this.postModel.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }
}
