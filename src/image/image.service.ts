import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './entities/image.entity';
import mongoose from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class ImageService {

  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: mongoose.Model<Image>
  ) {}

  create(image: string, postId: string) {
    try {
      return this.imageModel.create({
        image: image,
        postId: postId
      })
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

  update(id: number, updateImageDto: UpdateImageDto) {
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
