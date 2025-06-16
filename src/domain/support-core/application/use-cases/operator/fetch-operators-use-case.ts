import { Injectable } from "@nestjs/common"
import { Either, right } from "src/core/exceptions/either"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"
import { PeopleRepository } from "../../repositories/people-repository"

export interface FetchOperatorsCaseRequest {}

export type FetchOperatorsCaseResponse = Either<never, {
    operators: Operator[]
}>

@Injectable()
export class FetchOperatorsUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(): Promise<FetchOperatorsCaseResponse> {
        // const {} = data

        const peoples = await this.operatorRepository.findAll('OPERATOR') as Operator[]

        return right({
            operators: peoples
        })
    }
}