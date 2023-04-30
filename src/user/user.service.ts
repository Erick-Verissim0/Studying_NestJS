import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ name, email, password }: CreateUserDTO) {
        // sempre que o seu retorno for dentro de uma função assincrona, não é obrigatorio colocar o await
        return await this.prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    async read() {
        return this.prisma.user.findMany()
    }

}