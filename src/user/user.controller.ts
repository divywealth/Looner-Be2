import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
