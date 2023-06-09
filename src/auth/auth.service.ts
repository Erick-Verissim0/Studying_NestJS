import { BadGatewayException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) { }

    async createToken(user: User) {
        return {
            accessToken:
                this.jwtService.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }, {
                    expiresIn: '7 days', // Tempo que o token ficará valido!
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience
                })
        }
    }

    async checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            })
            return data
        } catch (error) {
            console.log('AQUI')
            throw new BadGatewayException(error)
        }
    }

    async isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (error) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.')
        }
        return this.createToken(user)
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('E-mail incorreto.')
        }

        // TO DO: Enviar o e-mail...

        return user
    }

    async reset(password: string, token: string) {

        // TO DTO: Validar o token...

        const id = 0

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        })

        return this.createToken(user)
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data)

        return this.createToken(user)
    }
}