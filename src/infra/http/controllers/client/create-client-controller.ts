import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CreateClientUseCase } from "src/domain/support-core/application/use-cases/client/create-client-use-case";
import { ExistingEmailError } from "src/core/exceptions/errors/existing-email-error";
import { ExistingCpfError } from "src/core/exceptions/errors/existing-cpf-error";

const createClientSchema = z.object({
    name: z.string(),
    enterprise: z.string(),
    phone: z.string(),
    cpf: z.string(),
    email: z.email()
})

type CreateClientSchema = z.infer<typeof createClientSchema>

@Controller('clients')
export class CreateClientController {
    constructor(
        private readonly createClientUseCase: CreateClientUseCase
    ){}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createClientSchema))
    async handle(@Body() body: CreateClientSchema) {
        const {
            name, email, cpf, enterprise, phone
        } = body

        const result = await this.createClientUseCase.execute({
            name, email, cpf, enterprise, phone
        })

        if(result.isLeft()) {
            if (result.value instanceof ExistingCpfError) {
                throw new ConflictException('This cpf is already in use.')
            }

            if (result.value instanceof ExistingEmailError) {
                throw new ConflictException('This email is already in use.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}