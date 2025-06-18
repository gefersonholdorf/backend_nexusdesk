import { BadRequestException, Controller, Get, HttpCode, Param, ParseIntPipe } from "@nestjs/common";
import { FetchTicketsPresenter } from "../../presenters/fetch-tickets-presenter";
import { FetchTicketsByPeopleIdUseCase } from "src/domain/support-core/application/use-cases/ticket/fetch-ticket-by-operator-id-use-case";

@Controller('tickets/peoples/:id')
export class FetchTicketsByPeopleIdController {
    constructor(
        private readonly fetchTicketsByPeopleIdUseCase: FetchTicketsByPeopleIdUseCase
    ) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) peopleId: number) {

        const result = await this.fetchTicketsByPeopleIdUseCase.execute({
            peopleId
        })

        if(result.isLeft()) {
            throw new BadRequestException('Validation error.')
        }

        return {
            ticket: FetchTicketsPresenter.toHttp(result.value.ticketsList)
        }
    }
}