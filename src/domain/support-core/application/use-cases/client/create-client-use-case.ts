import { Injectable } from "@nestjs/common"
import { right, Either, left } from "src/core/exceptions/either"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { People } from "src/domain/support-core/enterprise/entities/people"
import { PeopleType } from "src/domain/support-core/enterprise/types/people-type"
import { PeopleRepository } from "../../repositories/people-repository"
import { ExistingCpfError } from "src/core/exceptions/errors/existing-cpf-error"
import { ExistingEmailError } from "src/core/exceptions/errors/existing-email-error"

export interface CreateClientUseCaseRequest {
    name: string
    enterprise: string
    phone: string
    cpf: string
    email: string
}

export type CreateClientUseCaseResponse = Either<ExistingCpfError | ExistingEmailError, {}>

@Injectable()
export class CreateClientUseCase {
    constructor(
        private readonly clientRepository: PeopleRepository
    ) {}

    async execute(data: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
        const {name, enterprise, phone, cpf, email} = data

        const existingEmail = await this.clientRepository.findByEmail(email)

        if(existingEmail) {
            return left(new ExistingEmailError())
        }

        const existingCpf = await this.clientRepository.findByCpf(cpf)

        if(existingCpf) {
            return left(new ExistingCpfError())
        }

        const newClient = Client.create({client: People.create({
            name, enterprise, phone, cpf, email, peopleType: PeopleType.CLIENT
        })})

        await this.clientRepository.create(newClient)

        return right({})
    }
}