import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"
import { TicketRepository } from "../../repositories/ticket-repository"
import { InvalidPeopleRemoveError } from "src/core/exceptions/errors/invalid-people-remove-error"

export interface DeleteOperatorUseCaseRequest {
    operatorId: number
}

export type DeleteOperatorUseCaseResponse = Either<ResourceNotFoundError | InvalidPeopleRemoveError, {}>

@Injectable()
export class DeleteOperatorUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository,
        private readonly ticketRepository: TicketRepository
    ) {}

    async execute(data: DeleteOperatorUseCaseRequest): Promise<DeleteOperatorUseCaseResponse> {
        const { operatorId } = data

        const people = await this.operatorRepository.findById(operatorId, 'OPERATOR') as Operator

        if(!people) {
            return left(new ResourceNotFoundError('Operator not found.'))
        }

        const tickets = await this.ticketRepository.findAllByPeopleId(operatorId)

        if(tickets.length !== 0) {
            return left(new InvalidPeopleRemoveError())
        }

        await this.operatorRepository.delete(operatorId)

        return right({})
    }
}