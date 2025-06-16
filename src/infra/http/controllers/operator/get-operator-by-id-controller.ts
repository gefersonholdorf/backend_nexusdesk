import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { GetOperatorByIdUseCase } from "src/domain/support-core/application/use-cases/operator/get-client-by-id-use-case";
import { GetOperatorByIdPresenter } from "../../presenters/get-operator-presenter";

@Controller('operators/:id')
export class GetOperatorByIdController {
    constructor(
        private readonly getOperatorByIdUseCase: GetOperatorByIdUseCase
    ){}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) operatorId: number) {

        const result = await this.getOperatorByIdUseCase.execute({
            id: operatorId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Operator not found.')
            }

            throw new BadRequestException('Validation error.')
        }

        return {
            operator: GetOperatorByIdPresenter.toHttp(result.value.operator)
        }
    }
}