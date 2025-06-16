import { Injectable } from "@nestjs/common";
import { PeopleRepository } from "src/domain/support-core/application/repositories/people-repository";
import { Client } from "src/domain/support-core/enterprise/entities/client";
import { Operator } from "src/domain/support-core/enterprise/entities/operator";
import { PrismaPeopleMapper } from "../mappers/prisma-people-mapper";
import { PrismaService } from "../prisma.service";
import type { PeopleType } from "src/domain/support-core/enterprise/types/people-type";
import type { TypePeople } from "src/core/repositories/type-people";

@Injectable()
export class PrismaPeopleRepository implements PeopleRepository {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(people: Client | Operator): Promise<void> {
        const data = PrismaPeopleMapper.toPrisma(people)

        await this.prisma.peoples.create({data})
    }

    async findById(id: number, type: TypePeople): Promise<Client | Operator | null> {
        const people = await this.prisma.peoples.findUnique({
            where: {
                id,
                peopleType: `${type}`
            }
        })

        if(!people) {
            return null
        }
        
        return PrismaPeopleMapper.toDomain(people)
    }

    async findByCpf(cpf: string): Promise<Client | Operator | null> {
        const people = await this.prisma.peoples.findUnique({
            where: {
                cpf
            }
        })

        if(!people) {
            return null
        }

        return PrismaPeopleMapper.toDomain(people)
    }

    async findByEmail(email: string): Promise<Client | Operator | null> {
        const people = await this.prisma.peoples.findUnique({
            where: {
                email
            }
        })

        if(!people) {
            return null
        }

        return PrismaPeopleMapper.toDomain(people)
    }

    async findAll(type: TypePeople): Promise<Client[] | Operator[]> {
        const peoples = await this.prisma.peoples.findMany({
            where: {
                peopleType: `${type}`
            }
        })

        if (type === "CLIENT") {
            return peoples.map((people) => PrismaPeopleMapper.toDomain(people) as Client);
        }

        return peoples.map((people) => PrismaPeopleMapper.toDomain(people) as Operator);
    }

    async save(people: Client | Operator, id: number): Promise<void> {
        const data = PrismaPeopleMapper.toPrisma(people)

        await this.prisma.peoples.update(
            {
                where: {
                    id
                }, 
                data
            }
        )
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}