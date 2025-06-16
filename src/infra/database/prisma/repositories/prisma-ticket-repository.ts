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
    findById(id: number): Promise<Ticket | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Ticket[]> {
        throw new Error("Method not implemented.");
    }
    save(ticket: Ticket, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}