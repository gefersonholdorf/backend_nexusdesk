import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket"
import { PeopleRepository } from "../../repositories/people-repository"
import { TicketRepository } from "../../repositories/ticket-repository"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"

export interface GetTicketByIdUseCaseRequest {
    ticketId: number
}

export type GetTicketByIdUseCaseResponse = Either<ResourceNotFoundError, {
    ticket: Ticket
}>

@Injectable()
export class GetTicketByIdUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly peopleRepository: PeopleRepository
    ) {}

    async execute(data: GetTicketByIdUseCaseRequest): Promise<GetTicketByIdUseCaseResponse> {
        const { ticketId } = data

        const ticket = await this.ticketRepository.findById(ticketId)

        if(!ticket) {
            return left(new ResourceNotFoundError('Ticket not found.'))
        }

        const client = await this.peopleRepository.findById(ticket.clientId.value, 'CLIENT')
        const operator = ticket.operatorId ? await this.peopleRepository.findById(ticket.operatorId.value, 'OPERATOR') : null

        ticket.client = client as Client
        ticket.operator = operator as Operator

        return right({
            ticket
        })
    }
}