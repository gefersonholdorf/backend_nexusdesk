import { Injectable } from "@nestjs/common"
import { left, right, type Either } from "src/core/exceptions/either"
import { Operator } from "src/domain/support-core/enterprise/entities/operator"
import { People } from "src/domain/support-core/enterprise/entities/people"
import { PeopleType } from "src/domain/support-core/enterprise/types/people-type"
import { PeopleRepository } from "../../repositories/people-repository"
import { ExistingCpfError } from "src/core/exceptions/errors/existing-cpf-error"
import { ExistingEmailError } from "src/core/exceptions/errors/existing-email-error"

export interface CreateOperatorUseCaseRequest {
    name: string
    enterprise: string
    phone: string
    cpf: string
    email: string
}

export type CreateOperatorUseCaseResponse = Either<ExistingEmailError | ExistingCpfError, {}>

@Injectable()
export class CreateOperatorUseCase {
    constructor(
        private readonly operatorRepository: PeopleRepository
    ) {}

    async execute(data: CreateOperatorUseCaseRequest): Promise<CreateOperatorUseCaseResponse> {
        const {name, enterprise, phone, cpf, email} = data

        const existingEmail = await this.operatorRepository.findByEmail(email)
        
        if(existingEmail) {
            return left(new ExistingEmailError())
        }
        
        const existingCpf = await this.operatorRepository.findByCpf(cpf)
        
        if(existingCpf) {
            return left(new ExistingCpfError())
        }
        

        const newOperator = Operator.create({operator: People.create({
            name, enterprise, phone, cpf, email, peopleType: PeopleType.OPERATOR
        })})

        await this.operatorRepository.create(newOperator)

        return right({})
    }
}