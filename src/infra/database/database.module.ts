import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PeopleRepository } from "src/domain/support-core/application/repositories/people-repository";
import { PrismaPeopleRepository } from "./prisma/repositories/prisma-people-repository";
import { TicketRepository } from "src/domain/support-core/application/repositories/ticket-repository";
import { PrismaTicketRepository } from "./prisma/repositories/prisma-ticket-repository";

@Module({
    imports: [],
    providers: [
        PrismaService,
        {
            provide: PeopleRepository,
            useClass: PrismaPeopleRepository
        },
        {
            provide: TicketRepository,
            useClass: PrismaTicketRepository
        }
    ],
    exports: [
        PrismaService, PeopleRepository, TicketRepository
    ]
})
export class DatabaseModule{}