import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { TicketStatus } from "../types/ticket-status";
import { Client } from "./client";
import { Operator } from "./operator";
import { Status } from "../types/status";

export interface TicketProps {
    id?: UniqueEntityId,
    summary: string
    ticketStatus?: TicketStatus
    client: Client
    operator?: Operator | null
    createdAt?: Date
    updatedAt?: Date
    status?: Status
}

export class Ticket extends EntityBase<TicketProps> {

    get summary() {
        return this.summary
    }

    get ticketStatus() {
        return this.ticketStatus
    }

    set ticketStatus(ticketStatus: TicketStatus) {
        this.updatePropries()
        this.ticketStatus = ticketStatus
    }

    get operator() {
        return this.operator
    }

    set operator(operator: Operator) {
        this.updatePropries()
        this.operator = operator
    }

    get createdAt() {
        return this.createdAt
    }

    get updatedAt() {
        return this.updatedAt
    }

    set updatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

    get status() {
            return this.status
        }
    
    set status(status: Status) {
        this.updatePropries()
        this.status = status
    }

    updatePropries() {
        this.updatedAt = new Date()
    }

    static create(props: TicketProps, id?: UniqueEntityId) {
        return new Ticket({
            summary: props.summary,
            ticketStatus: props.ticketStatus ?? TicketStatus.EM_ABERTO,
            client: props.client,
            operator: props.operator ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            status: props.status ?? Status.ATIVO
        }, 
        id ?? new UniqueEntityId())
    }
}