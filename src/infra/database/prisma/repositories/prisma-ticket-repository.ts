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

    async findAll(): Promise<Ticket[]> {
        const tickets = await this.prisma.tickets.findMany()

        return tickets.map((ticket) => PrismaTicketMapper.toDomain(ticket))
    }

    async findAllByPeopleId(id: number): Promise<Ticket[]> {
        const tickets = await this.prisma.tickets.findMany({
            where: {
                OR: [
                    {
                        client_id: id
                    },
                    {
                        operator_id: id
                    }
                ]
            },
        })

        return tickets.map((ticket) => PrismaTicketMapper.toDomain(ticket))
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

    async delete(id: number): Promise<void> {
        await this.prisma.tickets.delete({
            where: {
                id
            }
        })
    }

}