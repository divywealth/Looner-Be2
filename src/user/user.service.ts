import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll() {
    const users = await this.userModel.find().populate('posts').exec();
    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).populate('posts').exec();
      console.log(user.posts)
    return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
