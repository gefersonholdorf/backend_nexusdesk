import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { Status } from "src/domain/support-core/enterprise/types/status"

export interface UpdateClientUseCaseRequest {
    id: number
    name: string
    enterprise: string
    phone: string
    status: number
}

export type UpdateClientUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: PeopleRepository
    ) {}

    async execute(data: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {
        const {id, name, enterprise, phone, status} = data

        const people = await this.clientRepository.findById(id) as Client

        if(!people) {
            return left(new ResourceNotFoundError('Client not found.'))
        }

        people.client.name = name
        people.client.enterprise = enterprise
        people.client.phone = phone
        people.client.status = status;

        await this.clientRepository.save(people, id)

        return right({})
    }
}