import type { Prisma, tickets as PrismaTicket } from "generated/prisma";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket";

export class PrismaTicketMapper {
    
    static toPrisma(ticket: Ticket): Prisma.ticketsCreateManyInput {
        return {
            summary: ticket.summary,
            description: ticket.description,
            ticketStatus: ticket.ticketStatus,
            client_id: ticket.clientId.value,
            operator_id: ticket.operatorId?.value,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            status: ticket.status == 0 ? "INACTIVE" : "ACTIVE",
        }
    }

    static toDomain(prismaTicket: PrismaTicket): Ticket {
        return Ticket.create({
            summary: prismaTicket.summary,
            description: prismaTicket.description,
            clientId: new UniqueEntityId(prismaTicket.client_id),
            operatorId: prismaTicket.operator_id ? new UniqueEntityId(prismaTicket.operator_id) : null,
            ticketStatus: prismaTicket.ticketStatus,
            createdAt: prismaTicket.createdAt,
            updatedAt: prismaTicket.updatedAt,
            status: prismaTicket.status == 'ACTIVE' ? 1 : 0
        }, new UniqueEntityId(prismaTicket.id))
    }
}