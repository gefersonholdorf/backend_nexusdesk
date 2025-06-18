import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { TicketRepository } from "../../repositories/ticket-repository"
import { PeopleRepository } from "../../repositories/people-repository"

export interface AssignOperatorToTickerUseCaseRequest {
    ticketId: number
    operatorId: number
}

export type AssignOperatorToTickerUseCaseResponse = Either<ResourceNotFoundError , {}>

@Injectable()
export class AssignOperatorToTickerUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(data: AssignOperatorToTickerUseCaseRequest): Promise<AssignOperatorToTickerUseCaseResponse> {
        const { operatorId, ticketId } = data

        const ticket = await this.ticketRepository.findById(ticketId)

        if(!ticket) {
            return left(new ResourceNotFoundError('Ticket not found.'))
        }

        const operator = await this.operatorRepository.findById(operatorId, 'OPERATOR')

        if(!operator) {
            return left(new ResourceNotFoundError('Operator not found.'))
        }

        ticket.operatorId = operator.id

        await this.ticketRepository.save(ticket, ticketId)

        return right({})
    }
}