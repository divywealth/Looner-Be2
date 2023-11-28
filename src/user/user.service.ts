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
    return this.userModel.find().populate('posts').exec();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return this.userModel.findById(id).populate('posts').exec();
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
