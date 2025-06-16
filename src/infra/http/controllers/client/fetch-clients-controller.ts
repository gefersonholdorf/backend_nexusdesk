import { Controller, Get, HttpCode, Param, ParseIntPipe } from "@nestjs/common";
import { FetchClientsUseCase } from "src/domain/support-core/application/use-cases/client/fetch-clients-use-case";
import { FetchClientsPresenter } from "../../presenters/fetch-clients-presenter";

@Controller('clients')
export class FetchClientsController {
    constructor(
        private readonly fetchClientsUseCase: FetchClientsUseCase
    ){}

    @Get()
    @HttpCode(200)
    async handle() {

        const result = await this.fetchClientsUseCase.execute()

        console.log(result)

        return {
            clients: FetchClientsPresenter.toHttp(result.value.clients)
        }
    }
}