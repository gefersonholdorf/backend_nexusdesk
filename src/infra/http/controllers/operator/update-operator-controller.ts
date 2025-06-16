import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { UpdateOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/update-operator-use-case";
import { z } from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";

const updateOperatorSchema = z.object({
    name: z.string(),
    enterprise: z.string(),
    phone: z.string(),
    status: z.number()
})

type UpdateOperatorSchema = z.infer<typeof updateOperatorSchema>

@Controller('operators/:id')
export class UpdateOperatorController {
    constructor(
        private readonly updateOperatorUseCase: UpdateOperatorUseCase
    ){}

    @Put()
    @HttpCode(204)
    async handle(
        @Body(new ZodValidationPipe(updateOperatorSchema)) body: UpdateOperatorSchema, 
        @Param('id', ParseIntPipe) operatorId: number) {
        const {
            name, enterprise, phone, status
        } = body

        const result = await this.updateOperatorUseCase.execute({
            name, enterprise, phone, status, id: operatorId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Operator not found.')
            }

            throw new BadRequestException('Validation error.')
        }
    }
}