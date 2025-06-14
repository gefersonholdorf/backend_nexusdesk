import type { Client } from "../../enterprise/entities/client";

export abstract class ClientRepository {
    abstract create(client: Client): Promise<void>
    abstract findById(id: number): Promise<Client | null>
    abstract findByCpf(cpf: string): Promise<Client | null>
    abstract findByEmail(email: string): Promise<Client | null>
    abstract findAll(): Promise<Client[]>
    abstract save(client: Client, id: number): Promise<void>
    abstract delete(id: number): Promise<void>
}