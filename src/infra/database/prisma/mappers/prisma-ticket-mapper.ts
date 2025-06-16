import type { Prisma } from "generated/prisma";
import type { Ticket } from "src/domain/support-core/enterprise/entities/ticket";

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

    static toDomain() {

    }
}