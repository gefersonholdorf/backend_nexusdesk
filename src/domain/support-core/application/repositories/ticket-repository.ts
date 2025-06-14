import type { Ticket } from "../../enterprise/entities/ticket";

export abstract class TicketRepository {
    abstract create(ticket: Ticket): Promise<void>
    abstract findById(id: number): Promise<Ticket | null>
    abstract findAll(): Promise<Ticket[]>
    abstract save(ticket: Ticket, id: number): Promise<void>
    abstract delete(id: number): Promise<void>
}