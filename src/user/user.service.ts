import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

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

    async readOne(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async updateAll(id: number, data: UpdatePutUserDTO) {
        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, data: UpdatePatchUserDTO) {
        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

}