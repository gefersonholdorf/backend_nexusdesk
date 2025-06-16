import type { TypePeople } from "src/core/repositories/type-people";
import { Client } from "../../enterprise/entities/client";
import { Operator } from "../../enterprise/entities/operator";

export abstract class PeopleRepository {
    abstract create(people: Client | Operator): Promise<void>
    abstract findById(id: number, type: TypePeople): Promise<Client | Operator | null>
    abstract findByCpf(cpf: string): Promise<Client | Operator | null>
    abstract findByEmail(email: string): Promise<Client | Operator | null>
    abstract findAll(type: TypePeople): Promise<Client[] | Operator[]>
    abstract save(people: Client | Operator, id: number): Promise<void>
    abstract delete(id: number): Promise<void>
}