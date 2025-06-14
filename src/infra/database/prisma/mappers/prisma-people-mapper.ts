import { peoples_peopleType, Prisma, peoples as PrismaPeople } from "generated/prisma";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Client } from "src/domain/support-core/enterprise/entities/client";
import { Operator } from "src/domain/support-core/enterprise/entities/operator";
import { People } from "src/domain/support-core/enterprise/entities/people";
import { PeopleType } from "src/domain/support-core/enterprise/types/people-type";
import { Status } from "src/domain/support-core/enterprise/types/status";

export class PrismaPeopleMapper {

    private static mapPeopleType(type: PeopleType): peoples_peopleType {
    switch (type) {
      case PeopleType.CLIENT:
        return peoples_peopleType.CLIENT;
      case PeopleType.OPERATOR:
        return peoples_peopleType.OPERATOR;
      default:
        throw new Error("Tipo de pessoa desconhecido.");
    }
  }
    
    static toHttp(people: Client | Operator): Prisma.peoplesCreateManyInput {
        const person = people instanceof Client ? people.client : people.operator

        return {
            name: person.name,
            enterprise: person.enterprise,
            phone: person.phone,
            cpf: person.cpf,
            email: person.email,
            peopleType: this.mapPeopleType(person.peopleType)
        }
    }

    static toDomain(prismaPeople: PrismaPeople): Client | Operator {
        if(prismaPeople.peopleType === 'CLIENT') {
            return Client.create({
                client: People.create({
                    name: prismaPeople.name,
                    cpf: prismaPeople.cpf,
                    email: prismaPeople.email,
                    enterprise: prismaPeople.enterprise,
                    phone: prismaPeople.phone,
                    status: prismaPeople.status == "ACTIVE" ? Status.ACTIVE : Status.INACTIVE,
                    createdAt: prismaPeople.createdAt,
                    updatedAt: prismaPeople.updatedAt,
                    peopleType: PeopleType.CLIENT
                })
            }, new UniqueEntityId(prismaPeople.id))
        }
        return Operator.create({
            operator: People.create({
                name: prismaPeople.name,
                cpf: prismaPeople.cpf,
                email: prismaPeople.email,
                enterprise: prismaPeople.enterprise,
                phone: prismaPeople.phone,
                status: prismaPeople.status == "ACTIVE" ? Status.ACTIVE : Status.INACTIVE,
                createdAt: prismaPeople.createdAt,
                updatedAt: prismaPeople.updatedAt,
                peopleType: PeopleType.CLIENT
            })
        }, new UniqueEntityId(prismaPeople.id))
    }
}