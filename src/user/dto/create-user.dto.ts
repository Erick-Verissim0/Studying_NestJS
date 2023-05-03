import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    /*
    @IsStrongPassword({
        minLength: 6
        
        TEM QUE TER OBRIGATORIAMENTE:
        1 caractere maiúsculo
        1 caractere minúsculo
        1 número
        1 caractere especial

        PARA QUE A REGRA A CIMA NÃO SEJA APLICADA É SÓ COLOCAR "minNumbers: 0" e etc...
    })
    password: string;
    */

    @IsString()
    @MinLength(6)
    password: string

}