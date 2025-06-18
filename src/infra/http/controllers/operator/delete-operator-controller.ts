import { BadRequestException, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, UnprocessableEntityException } from "@nestjs/common";
import { InvalidPeopleRemoveError } from "src/core/exceptions/errors/invalid-people-remove-error";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { DeleteOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/delete-operator-use-case";

@Controller('operators/:id')
export class DeleteOperatorController {
    constructor(
        private readonly deleteOperatorUseCase: DeleteOperatorUseCase
    ){}

    @Delete()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) operatorId: number) {

        const result = await this.deleteOperatorUseCase.execute({
            operatorId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Operator not found.')
            }

            if(result.value instanceof InvalidPeopleRemoveError) {
                throw new UnprocessableEntityException('Removal denied: the person is linked to one or more tickets.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}