import { TransformDate } from "src/core/utils/transform-date";
import { TransformTicketStatus } from "src/core/utils/transform-ticket-status";
import { Operator } from "src/domain/support-core/enterprise/entities/operator";
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket";

export class FetchTicketsPresenter {

    static toHttp(tickets: Ticket[]) {

        return tickets.map((ticket) => {
            const { client } = ticket.client
            const operator: Operator | null = ticket.operator ?? null
            return {
                key: `NX-${String(ticket.id.value).padStart(3, '0')}`,
                summary: ticket.summary,
                description: ticket.description,
                clientName: client.name,
                clientEmail: client.email,
                clientPhone: client.phone,
                operatorName: operator ? operator.operator.name : null,
                ticketStatus: TransformTicketStatus.toTransform(ticket.ticketStatus),
                closingDate: TransformDate.Format(ticket.closingDate!) ?? null,
                createdAt: TransformDate.Format(ticket.createdAt!),
                updatedAt: TransformDate.Format(ticket.updatedAt!)
            }
        })
    }
}