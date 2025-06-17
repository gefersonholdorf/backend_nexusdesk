import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { TicketStatus } from "../types/ticket-status";
import { Client } from "./client";
import { Operator } from "./operator";
import { Status } from "../types/status";

export interface TicketProps {
    id?: UniqueEntityId,
    summary: string
    description: string,
    ticketStatus?: TicketStatus
    clientId: UniqueEntityId
    client?: Client | null
    operatorId?: UniqueEntityId | null
    operator?: Operator | null 
    createdAt?: Date | null 
    updatedAt?: Date | null 
    status?: Status | null 
}

export class Ticket extends EntityBase<TicketProps> {

    get summary() {
        return this.props.summary
    }

    get description() {
        return this.props.description
    }

    get ticketStatus() {
        return this.props.ticketStatus!
    }

    set ticketStatus(ticketStatus: TicketStatus) {
        this.updatePropries()
        this.props.ticketStatus = ticketStatus
    }

    get operatorId() {
        return this.props.operatorId
    }

    get operator() {
        return this.props.operator!
    }

    set operator(operator: Operator) {
        this.props.operator = operator
    }

    get client() {
        return this.props.client!
    }

    set client(client: Client) {
        this.props.client = client
    }

    get clientId() {
        return this.props.clientId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt!
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt
    }

    get status() {
        return this.props.status!
    }
    
    set status(status: Status) {
        this.updatePropries()
        this.props.status = status
    }

    updatePropries() {
        this.props.updatedAt = new Date()
    }

    static create(props: TicketProps, id?: UniqueEntityId) {
        return new Ticket({
            summary: props.summary,
            description: props.description,
            ticketStatus: props.ticketStatus ?? TicketStatus.EM_ABERTO,
            clientId: props.clientId,
            client: props.client ?? null,
            operatorId: props.operatorId ?? null,
            operator: props.operator ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            status: props.status ?? Status.ACTIVE
        }, 
        id ?? new UniqueEntityId())
    }
}