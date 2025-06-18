import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { TicketRepository } from "../../repositories/ticket-repository"
import { InvalidTicketStatusTransitionError } from "src/core/exceptions/errors/invalid-ticket-status-transition-error"

export interface TicketStatusTransitionUseCaseRequest {
    ticketId: number
    status: number
}

export type TicketStatusTransitionUseCaseResponse = Either<ResourceNotFoundError | InvalidTicketStatusTransitionError, {}>

@Injectable()
export class TicketStatusTransitionUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
    ) {}

    async execute(data: TicketStatusTransitionUseCaseRequest): Promise<TicketStatusTransitionUseCaseResponse> {
        const { status, ticketId } = data

        const ticket = await this.ticketRepository.findById(ticketId)

        if(!ticket) {
            return left(new ResourceNotFoundError('Ticket not found.'))
        }

        const currentStatus = ticket.ticketStatus.valueOf()

        if (currentStatus === status) {
            return right({})
        }

        if(currentStatus === 5 || currentStatus === 6) {
            return left(new InvalidTicketStatusTransitionError('Invalid ticket status transition.'))
        }

        if(status === 1) {
            return left(new InvalidTicketStatusTransitionError('Invalid ticket status transition.'))
        }

        if(status === 3 && currentStatus != 2) {
            return left(new InvalidTicketStatusTransitionError('Invalid ticket status transition.'))
        }

        if(status === 4 && currentStatus != 2) {
            return left(new InvalidTicketStatusTransitionError('Invalid ticket status transition.'))
        }

        if(status != 1 && !ticket.operatorId) {
            return left(new InvalidTicketStatusTransitionError('An operator must be assigned to proceed with this operation.'))
        }

        if(status === 6) {
            ticket.closingDate = new Date()
        }

        ticket.ticketStatus = status
        await this.ticketRepository.save(ticket, ticketId)

        return right({})
    }
}