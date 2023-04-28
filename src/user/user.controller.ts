import { Controller, Post, Body, Get, Param, Put, Patch } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()  // quando não tem virgula é porque ele está decorando e passando para o argumento depois do decorator
  async create(@Body() body) {
    return { body };
  }

  @Get()
  async read() {
    return { users: [] }
  }

  @Get(':id')
  async readOne(@Param() params) {
    return { user: {}, params }
  }

  @Put(':id')
  async updateAll(@Body() body, @Param() params) {
    return {
      method: 'put',
      body,
      params
    }
  }
  @Patch(':id')
  async updatePartial(@Body() body, @Param() params) {
    return {
      method: 'patch',
      body,
      params
    }
  }

}
