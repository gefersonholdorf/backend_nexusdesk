import { Injectable } from "@nestjs/common"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { left, right, type Either } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket"
import { PeopleRepository } from "../../repositories/people-repository"
import { TicketRepository } from "../../repositories/ticket-repository"

export interface CreateTicketUseCaseRequest {
    summary: string
    description: string,
    clientId: number
}

export type CreateTicketUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class CreateTicketUseCase {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly peopleRepository: PeopleRepository
    ) {}

    async execute(data: CreateTicketUseCaseRequest): Promise<CreateTicketUseCaseResponse> {
        const { summary, description, clientId } = data

        const client = await this.peopleRepository.findById(clientId, 'CLIENT')

        if(!client) {
            return left(new ResourceNotFoundError('Client not found'))
        }

        const newTicket = Ticket.create({
            summary,
            description,
            clientId: new UniqueEntityId(clientId),
        })

        await this.ticketRepository.create(newTicket)

        return right({})
    }
}