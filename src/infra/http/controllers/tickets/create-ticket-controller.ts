import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post } from "@nestjs/common";
import z from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CreateTicketUseCase } from "src/domain/support-core/application/use-cases/ticket/create-ticket-use-case";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";

const createTicketSchema = z.object({
    summary: z.string(),
    description: z.string(),
    clientId: z.number()
})

type CreateTicketSchema = z.infer<typeof createTicketSchema>

@Controller('tickets')
export class CreateTicketController {
    constructor(
        private readonly createTicketUseCase: CreateTicketUseCase
    ) {}

    @Post()
    @HttpCode(201)
    async handle(@Body(new ZodValidationPipe(createTicketSchema)) body: CreateTicketSchema) {
        const { summary, description, clientId } = body

        const result = await this.createTicketUseCase.execute({
            summary, description, clientId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Client not found.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}