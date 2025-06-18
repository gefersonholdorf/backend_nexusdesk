import { BadRequestException, Controller, Get, HttpCode } from "@nestjs/common";
import { FetchTicketsUseCase } from "src/domain/support-core/application/use-cases/ticket/fetch-tickets-use-case";
import { FetchTicketsPresenter } from "../../presenters/fetch-tickets-presenter";

@Controller('tickets')
export class FetchTicketsController {
    constructor(
        private readonly fetchTicketsUseCase: FetchTicketsUseCase
    ) {}

    @Get()
    @HttpCode(200)
    async handle() {

        const result = await this.fetchTicketsUseCase.execute()

        if(result.isLeft()) {
            throw new BadRequestException('Validation error.')
        }

        return {
            ticket: FetchTicketsPresenter.toHttp(result.value.ticketsList)
        }
    }
}