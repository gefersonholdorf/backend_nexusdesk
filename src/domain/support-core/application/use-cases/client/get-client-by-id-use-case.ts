import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Client } from "src/domain/support-core/enterprise/entities/client"

export interface GetClientByIdUseCaseRequest {
    id: number
}

export type GetClientByIdUseCaseResponse = Either<ResourceNotFoundError, {
    client: Client
}>

@Injectable()
export class GetClientByIdUseCase {
    constructor(
        private readonly clientRepository: PeopleRepository
    ) {}

    async execute(data: GetClientByIdUseCaseRequest): Promise<GetClientByIdUseCaseResponse> {
        const { id } = data

        const people = await this.clientRepository.findById(id) as Client

        if(!people) {
            return left(new ResourceNotFoundError('Client not found.'))
        }

        return right({
            client: people
        })
    }
}