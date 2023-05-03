import { Controller, Post, Body, Get, Put, Patch, Delete, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptors } from 'src/interceptors/log.interceptors';
import { ParamId } from '../decorators/param-id.decorator'

// @UseInterceptors(LogInterceptors) Se quiser que o interceptor pegue todos os Http Methods
@Controller('users')
export class UserController {
  
  constructor(private readonly userService: UserService) { }
  
  @UseInterceptors(LogInterceptors)
  @Post()  // quando não tem virgula é porque ele está decorando e passando para o argumento depois do decorator
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async read() {
    return this.userService.read()
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    console.log({ id })
    return this.userService.readOne(id)
  }

  @Put(':id')
  async updateAll(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updateAll(id, data)
  }
  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updatePartial(id, data)
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}
