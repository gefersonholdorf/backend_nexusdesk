import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CreateClientUseCase } from "src/domain/support-core/application/use-cases/client/create-client-use-case";

const createClientSchema = z.object({
    name: z.string(),
    enterprise: z.string(),
    phone: z.string(),
    cpf: z.string(),
    email: z.string().email()
})

type CreateClientSchema = z.infer<typeof createClientSchema>

@Controller('clients')
export class CreateClientController {
    constructor(
        private readonly createClientUseCase: CreateClientUseCase
    ){}

    @Post()
    @UsePipes(new ZodValidationPipe(createClientSchema))
    async handle(@Body() body: CreateClientSchema) {
        const {
            name, email, cpf, enterprise, phone
        } = body

        await this.createClientUseCase.execute({
            name, email, cpf, enterprise, phone
        })
    }
}