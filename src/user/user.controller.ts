import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Put('update')
  update(@Body() user: User) {
    return this.service.update(user);
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
