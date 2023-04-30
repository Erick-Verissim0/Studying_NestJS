import { Controller, Post, Body, Get, Put, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()  // quando não tem virgula é porque ele está decorando e passando para o argumento depois do decorator
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async read() {
    return this.userService.read()
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id)
  }

  @Put(':id')
  async updateAll(@Body() { name, email, password }: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'put',
      id
    }
  }
  @Patch(':id')
  async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'patch',
      id
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return {
      id
    }
  }
}
