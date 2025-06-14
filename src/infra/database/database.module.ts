import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PeopleRepository } from "src/domain/support-core/application/repositories/people-repository";
import { PrismaPeopleRepository } from "./prisma/repositories/prisma-people-repository";

@Module({
    imports: [],
    providers: [
        PrismaService,
        {
            provide: PeopleRepository,
            useClass: PrismaPeopleRepository
        }
    ],
    exports: [
        PrismaService, PeopleRepository
    ]
})
export class DatabaseModule{}