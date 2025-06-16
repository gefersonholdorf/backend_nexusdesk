import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { UpdateClientUseCase } from "src/domain/support-core/application/use-cases/client/update-client-use-case";
import { z } from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";

const updateClientSchema = z.object({
    name: z.string(),
    enterprise: z.string(),
    phone: z.string(),
    status: z.number()
})

type UpdateClientSchema = z.infer<typeof updateClientSchema>

@Controller('clients/:id')
export class UpdateClientController {
    constructor(
        private readonly updateClientUseCase: UpdateClientUseCase
    ){}

    @Put()
    @HttpCode(204)
    async handle(
        @Body(new ZodValidationPipe(updateClientSchema)) body: UpdateClientSchema, 
        @Param('id', ParseIntPipe) clientId: number) {
        const {
            name, enterprise, phone, status
        } = body

        const result = await this.updateClientUseCase.execute({
            name, enterprise, phone, status, id: clientId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Client not found.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}