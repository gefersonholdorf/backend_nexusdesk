import { Injectable } from "@nestjs/common"
import { right, type Either } from "src/core/exceptions/either"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"
import { People } from "src/domain/support-core/enterprise/entities/people"
import { PeopleType } from "src/domain/support-core/enterprise/types/people-type"
import { PeopleRepository } from "../../repositories/people-repository"

export interface CreateOperatorUseCaseRequest {
    name: string
    enterprise: string
    phone: string
    cpf: string
    email: string
}

export type CreateOperatorUseCaseResponse = Either<never, {}>

@Injectable()
export class CreateOperatorUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(data: CreateOperatorUseCaseRequest): Promise<CreateOperatorUseCaseResponse> {
        const {name, enterprise, phone, cpf, email} = data

        const newOperator = Operator.create({operator: People.create({
            name, enterprise, phone, cpf, email, peopleType: PeopleType.OPERATOR
        })})

        await this.operatorRepository.create(newOperator)

        return right({})
    }
}