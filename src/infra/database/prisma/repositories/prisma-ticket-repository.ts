import { Injectable } from "@nestjs/common";
import { TicketRepository } from "src/domain/support-core/application/repositories/ticket-repository";
import { Ticket } from "src/domain/support-core/enterprise/entities/ticket";
import { PrismaService } from "../prisma.service";
import { PrismaTicketMapper } from "../mappers/prisma-ticket-mapper";

@Injectable()
export class PrismaTicketRepository implements TicketRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(ticket: Ticket): Promise<void> {
        const data = PrismaTicketMapper.toPrisma(ticket)

        await this.prisma.tickets.create({data})
    }

    async findById(id: number): Promise<Ticket | null> {
        const ticket = await this.prisma.tickets.findUnique({
            where: {
                id
            }
        })

        if(!ticket) {
            return null
        }

        return PrismaTicketMapper.toDomain(ticket)
    }

    findAll(): Promise<Ticket[]> {
        throw new Error("Method not implemented.");
    }

    async save(ticket: Ticket, id: number): Promise<void> {
        const data = PrismaTicketMapper.toPrisma(ticket)

        await this.prisma.tickets.update({
            data, 
            where: {
                id
            }
        })
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}