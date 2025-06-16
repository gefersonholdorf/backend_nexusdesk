import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CreateOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/create-operator-use-case";
import { ExistingEmailError } from "src/core/exceptions/errors/existing-email-error";
import { ExistingCpfError } from "src/core/exceptions/errors/existing-cpf-error";

const createOperatorSchema = z.object({
    name: z.string(),
    enterprise: z.string(),
    phone: z.string(),
    cpf: z.string(),
    email: z.email()
})

type CreateOperatorSchema = z.infer<typeof createOperatorSchema>

@Controller('operators')
export class CreateOperatorController {
    constructor(
        private readonly createOperatorUseCase: CreateOperatorUseCase
    ){}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createOperatorSchema))
    async handle(@Body() body: CreateOperatorSchema) {
        const {
            name, email, cpf, enterprise, phone
        } = body

        const result = await this.createOperatorUseCase.execute({
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