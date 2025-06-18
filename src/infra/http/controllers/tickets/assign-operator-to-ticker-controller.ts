import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import z from "zod/v4";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { AssignOperatorToTickerUseCase } from "src/domain/support-core/application/use-cases/ticket/assign-operator-to-ticker-use-case";

const assignOperatorToTickerSchema = z.object({
    operatorId: z.number()
})

type AssignOperatorToTickerSchema = z.infer<typeof assignOperatorToTickerSchema>

@Controller('tickets/:id/assign-operator')
export class AssignOperatorToTickerController {
    constructor(
        private readonly assignOperatorToTickerUseCase: AssignOperatorToTickerUseCase
    ) {}

    @Post()
    @HttpCode(200)
    async handle(
        @Body(new ZodValidationPipe(assignOperatorToTickerSchema)) body: AssignOperatorToTickerSchema, 
        @Param('id', ParseIntPipe) ticketId: number
    ){
        const { operatorId } = body

        const result = await this.assignOperatorToTickerUseCase.execute({
            operatorId, ticketId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Operator not found.')
            }
            
            throw new BadRequestException('Validation error.')
        }
    }
}