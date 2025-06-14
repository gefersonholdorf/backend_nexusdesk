import type { Operator } from "../../enterprise/entities/operator";

export abstract class OperatorRepository {
    abstract create(operator: Operator): Promise<void>
    abstract findById(id: number): Promise<Operator | null>
    abstract findByCpf(cpf: string): Promise<Operator | null>
    abstract findByEmail(email: string): Promise<Operator | null>
    abstract findAll(): Promise<Operator[]>
    abstract save(operator: Operator, id: number): Promise<void>
    abstract delete(id: number): Promise<void>
}