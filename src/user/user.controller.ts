import { Controller, Post, Body, Get, Put, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()  // quando não tem virgula é porque ele está decorando e passando para o argumento depois do decorator
  async create(@Body() body: CreateUserDTO) {
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
  async updateAll(@Body() { name, email, password }: UpdatePutUserDTO, @Param() params) {
    return {
      method: 'put',
      params
    }
  }
  @Patch(':id')
  async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param() params) {
    return {
      method: 'patch',
      params
    }
  }

  @Delete(':id')
  async deleteOne(@Param() params) {
    return {
      params
    }
  }
}
