import { Injectable } from "@nestjs/common"
import { right, type Either } from "src/core/exceptions/either"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket"
import { PeopleRepository } from "../../repositories/people-repository"
import { TicketRepository } from "../../repositories/ticket-repository"

export interface FetchTicketsByPeopleIdUseCaseRequest {
    peopleId: number
}

export type FetchTicketsByPeopleIdUseCaseResponse = Either<never, {
    ticketsList: Ticket[]
}>

@Injectable()
export class FetchTicketsByPeopleIdUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly peopleRepository: PeopleRepository
    ) {}

    async execute(data: FetchTicketsByPeopleIdUseCaseRequest): Promise<FetchTicketsByPeopleIdUseCaseResponse> {

        const { peopleId } = data

        const tickets = await this.ticketRepository.findAllByPeopleId(peopleId)

        const ticketsList = await Promise.all(tickets.map(async (ticket) => {
            const client = await this.peopleRepository.findById(ticket.clientId.value, 'CLIENT')
            const operator = ticket.operatorId ? await this.peopleRepository.findById(ticket.operatorId.value, 'OPERATOR') : null

            ticket.client = client as Client
            ticket.operator = operator as Operator

            return ticket
        }))

        return right({
            ticketsList
        })
    }
}