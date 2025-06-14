import { Injectable } from "@nestjs/common";
import { PeopleRepository } from "src/domain/support-core/application/repositories/people-repository";
import { Client } from "src/domain/support-core/enterprise/entities/client";
import { Operator } from "src/domain/support-core/enterprise/entities/operator";
import { PrismaPeopleMapper } from "../mappers/prisma-people-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaPeopleRepository implements PeopleRepository {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(people: Client | Operator): Promise<void> {
        const data = PrismaPeopleMapper.toHttp(people)

        await this.prisma.peoples.create({data})
    }

    async findById(id: number): Promise<Client | Operator | null> {
        const people = await this.prisma.peoples.findUnique({
            where: {
                id
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

    findAll(): Promise<Client[] | Operator[]> {
        throw new Error("Method not implemented.");
    }
    save(people: Client | Operator, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}