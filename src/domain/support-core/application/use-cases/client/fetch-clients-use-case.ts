import { Injectable } from "@nestjs/common"
import { Either, right } from "src/core/exceptions/either"
import { Client } from "src/domain/support-core/enterprise/entities/client"
import { PeopleRepository } from "../../repositories/people-repository"

export interface FetchClientsCaseRequest {}

export type FetchClientsCaseResponse = Either<never, {
    clients: Client[]
}>

@Injectable()
export class FetchClientsUseCase {
    constructor(
        private readonly clientRepository: PeopleRepository
    ) {}

    async execute(): Promise<FetchClientsCaseResponse> {
        // const {} = data

        const peoples = await this.clientRepository.findAll('CLIENT') as Client[]

        return right({
            clients: peoples
        })
    }
}