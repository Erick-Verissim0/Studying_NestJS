import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body };
  }

  @Get()
  async read() {
    return{users:[]}
  }

  @Get(':id')
  async readOne(@Param() params) {
    return {user: {}, params}
  }

}
