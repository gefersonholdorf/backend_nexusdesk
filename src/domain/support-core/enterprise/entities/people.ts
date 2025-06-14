import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { PeopleType } from "../types/people-type";
import { Status } from "../types/status";

export interface PeopleProps {
    id?: UniqueEntityId,
    name: string
    enterprise: string
    phone: string
    cpf: string
    email: string
    peopleType: PeopleType
    createdAt?: Date
    updatedAt?: Date
    status?: Status
}

export class People extends EntityBase<PeopleProps> {

    get name() {
        return this.name
    }

    set name(name: string) {
        this.updatePropries()
        this.name = name
    }

    get enterprise() {
        return this.enterprise
    }

    set enterprise(enterprise: string) {
        this.updatePropries()
        this.enterprise = enterprise
    }

    get phone() {
        return this.phone
    }

    set phone(phone: string) {
        this.updatePropries()
        this.phone = phone
    }

    get cpf() {
        return this.cpf
    }

    get email() {
        return this.email
    }

    get peopleType() {
        return this.peopleType
    }

    get createdAt() {
        return this.createdAt
    }

    get updatedAt() {
        return this.updatedAt
    }

    set updatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
    }

    get status() {
        return this.status
    }

    set status(status: Status) {
        this.updatePropries()
        this.status = status
    }

    updatePropries() {
        this.updatedAt = new Date()
    }

    static create(props: PeopleProps, id?: UniqueEntityId) {
        return new People({
            name: props.name,
            enterprise: props.enterprise,
            phone: props.phone,
            cpf: props.cpf,
            email: props.email,
            peopleType: props.peopleType,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            status: props.status ?? Status.ATIVO
        }, 
        id ?? new UniqueEntityId())
    }
}