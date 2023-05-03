import { ExecutionContext, createParamDecorator } from "@nestjs/common";


// Criando um Decorator customizado
export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id)
})