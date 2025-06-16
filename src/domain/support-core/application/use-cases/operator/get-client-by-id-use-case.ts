import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"

export interface GetOperatorByIdUseCaseRequest {
    id: number
}

export type GetOperatorByIdUseCaseResponse = Either<ResourceNotFoundError, {
    operator: Operator
}>

@Injectable()
export class GetOperatorByIdUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(data: GetOperatorByIdUseCaseRequest): Promise<GetOperatorByIdUseCaseResponse> {
        const { id } = data

        const people = await this.operatorRepository.findById(id, 'OPERATOR') as Operator

        if(!people) {
            return left(new ResourceNotFoundError('Operator not found.'))
        }

        return right({
            operator: people
        })
    }
}