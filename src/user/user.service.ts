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
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
    return user
    } catch (error) {
      throw error
    }
  }
}
