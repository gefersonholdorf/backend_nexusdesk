import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { TicketRepository } from "../../repositories/ticket-repository"
import { InvalidPeopleRemoveError } from "src/core/exceptions/errors/invalid-people-remove-error"

export interface DeleteClientUseCaseRequest {
    clientId: number
}

export type DeleteClientUseCaseResponse = Either<ResourceNotFoundError | InvalidPeopleRemoveError, {}>

@Injectable()
export class DeleteClientUseCase {
    constructor(
        private readonly clientRepository: PeopleRepository,
        private readonly ticketRepository: TicketRepository
    ) {}

    async execute(data: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {
        const { clientId } = data

        const people = await this.clientRepository.findById(clientId, 'CLIENT') as Client

        if(!people) {
            return left(new ResourceNotFoundError('Client not found.'))
        }

        const tickets = await this.ticketRepository.findAllByPeopleId(clientId)

        console.log(tickets.length)

        if(tickets.length !== 0) {
            return left(new InvalidPeopleRemoveError())
        }

        await this.clientRepository.delete(clientId)

        return right({})
    }
}