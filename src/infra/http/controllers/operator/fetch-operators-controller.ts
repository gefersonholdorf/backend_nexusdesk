import { Controller, Get, HttpCode, Param, ParseIntPipe } from "@nestjs/common";
import { FetchOperatorsUseCase } from "src/domain/support-core/application/use-cases/operator/fetch-operators-use-case";
import { FetchOperatorsPresenter } from "../../presenters/fetch-operators-presenter";

@Controller('operators')
export class FetchOperatorsController {
    constructor(
        private readonly fetchOperatorsUseCase: FetchOperatorsUseCase
    ){}

    @Get()
    @HttpCode(200)
    async handle() {

        const result = await this.fetchOperatorsUseCase.execute()

        console.log(result)

        return {
            operators: FetchOperatorsPresenter.toHttp(result.value.operators)
        }
    }
}