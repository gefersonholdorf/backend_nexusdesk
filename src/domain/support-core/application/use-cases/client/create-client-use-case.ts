import { Injectable } from "@nestjs/common"
import { right, type Either } from "src/core/exceptions/either"
import { ClientRepository } from "../../repositories/client-repository"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { People } from "src/domain/support-core/enterprise/entities/people"
import { PeopleType } from "src/domain/support-core/enterprise/types/people-type"

export interface CreateClientUseCaseRequest {
    name: string
    enterprise: string
    phone: string
    cpf: string
    email: string
}

export type CreateClientUseCaseResponse = Either<never, {}>

@Injectable()
export class CreateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository
    ) {}

    async execute(data: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
        const {name, enterprise, phone, cpf, email} = data

        const newClient = Client.create({client: People.create({
            name, enterprise, phone, cpf, email, peopleType: PeopleType.CLIENT
        })})

        await this.clientRepository.create(newClient)

        return right({})
    }
}