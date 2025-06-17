import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { TicketStatusTransitionUseCase } from "src/domain/support-core/application/use-cases/ticket/ticket-status-transition-use-case";
import z from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { InvalidTicketStatusTransitionError } from "src/core/exceptions/errors/invalid-ticket-status-transition-error";

const ticketStatusTransitionSchema = z.object({
    status: z.number()
})

type TicketStatusTransitionSchema = z.infer<typeof ticketStatusTransitionSchema>

@Controller('tickets/:id/transition')
export class TicketStatusTransitionController {
    constructor(
        private readonly ticketStatusTransitionUseCase: TicketStatusTransitionUseCase
    ) {}

    @Post()
    @HttpCode(200)
    async handle(
        @Body(new ZodValidationPipe(ticketStatusTransitionSchema)) body: TicketStatusTransitionSchema, 
        @Param('id', ParseIntPipe) ticketId: number
    ){
        const { status } = body

        const result = await this.ticketStatusTransitionUseCase.execute({
            status, ticketId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Ticket not found.')
            }

            if(result.value instanceof InvalidTicketStatusTransitionError) {
                throw new UnprocessableEntityException('Invalid ticket status transition.')
            }
            
            throw new BadRequestException('Validation error.')
        }
    }
}