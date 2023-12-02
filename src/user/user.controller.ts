import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller({
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll(): Promise<User[] | null> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw error
    }
  }
}
