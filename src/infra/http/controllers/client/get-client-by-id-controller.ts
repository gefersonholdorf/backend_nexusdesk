import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { GetClientByIdUseCase } from "src/domain/support-core/application/use-cases/client/get-client-by-id-use-case";
import { GetClientByIdPresenter } from "../../presenters/get-client-by-id-presenter";

@Controller('clients/:id')
export class GetClientByIdController {
    constructor(
        private readonly getClientByIdUseCase: GetClientByIdUseCase
    ){}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) clientId: number) {

        const result = await this.getClientByIdUseCase.execute({
            id: clientId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Client not found.')
            }

            throw new BadRequestException('Validation error.')
        }

        return {
            client: GetClientByIdPresenter.toHttp(result.value.client)
        }
    }
}