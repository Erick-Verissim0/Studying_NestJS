import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService], // é a lista de que somente esse módulo terá acesso, ou de arquivos que estejam na mesma pasta
  exports: [],
})
export class UserModule { }
