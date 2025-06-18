import { BadRequestException, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, UnprocessableEntityException } from "@nestjs/common";
import { InvalidPeopleRemoveError } from "src/core/exceptions/errors/invalid-people-remove-error";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { DeleteClientUseCase } from "src/domain/support-core/application/use-cases/client/delete-client-by-id-use-case";

@Controller('clients/:id')
export class DeleteClientController {
    constructor(
        private readonly deleteClientUseCase: DeleteClientUseCase
    ){}

    @Delete()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) clientId: number) {

        const result = await this.deleteClientUseCase.execute({
            clientId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Client not found.')
            }

            if(result.value instanceof InvalidPeopleRemoveError) {
                throw new UnprocessableEntityException('Removal denied: the person is linked to one or more tickets.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}