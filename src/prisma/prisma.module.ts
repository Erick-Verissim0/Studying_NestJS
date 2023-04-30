import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService], // aqui eu estou importando
    exports: [PrismaService], // quem importar o PrismaModule terá acesso ao que estiver entre colchetes
})

export class PrismaModule { }
