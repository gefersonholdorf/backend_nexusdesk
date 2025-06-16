import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { PeopleRepository } from "../../repositories/people-repository"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"

export interface UpdateOperatorUseCaseRequest {
    id: number
    name: string
    enterprise: string
    phone: string
    status: number
}

export type UpdateOperatorUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class UpdateOperatorUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(data: UpdateOperatorUseCaseRequest): Promise<UpdateOperatorUseCaseResponse> {
        const {id, name, enterprise, phone, status} = data

        const people = await this.operatorRepository.findById(id, 'OPERATOR') as Operator

        if(!people) {
            return left(new ResourceNotFoundError('Operator not found.'))
        }

        people.operator.name = name
        people.operator.enterprise = enterprise
        people.operator.phone = phone
        people.operator.status = status;

        await this.operatorRepository.save(people, id)

        return right({})
    }
}