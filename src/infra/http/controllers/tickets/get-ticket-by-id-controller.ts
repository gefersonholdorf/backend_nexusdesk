import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { GetTicketByIdUseCase } from "src/domain/support-core/application/use-cases/ticket/get-ticket-by-id-use-case";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { GetTicketByIdPresenter } from "../../presenters/get-ticket-by-id-presenter";

@Controller('tickets/:id')
export class GetTicketByIdController {
    constructor(
        private readonly getTicketByIdUseCase: GetTicketByIdUseCase
    ) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) ticketId: number) {

        const result = await this.getTicketByIdUseCase.execute({
            ticketId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Ticket not found.')
            }

            throw new BadRequestException('Validation error.')
        }

        return {
            ticket: GetTicketByIdPresenter.toHttp(result.value.ticket)
        }
    }
}