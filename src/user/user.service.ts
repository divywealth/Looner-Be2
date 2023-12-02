import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[] | null>  {
    return await this.userModel.find().populate({ path: 'posts', model: 'Post' }).exec();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).populate({ path: 'posts', model: 'Post' }).exec();
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
