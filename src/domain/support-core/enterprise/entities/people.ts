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
    createdAt?: Date | null
    updatedAt?: Date | null
    status?: Status | null
}

export class People extends EntityBase<PeopleProps> {

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.updatePropries()
        this.props.name = name
    }

    get enterprise() {
        return this.props.enterprise
    }

    set enterprise(enterprise: string) {
        this.updatePropries()
        this.props.enterprise = enterprise
    }

    get phone() {
        return this.props.phone
    }

    set phone(phone: string) {
        this.updatePropries()
        this.props.phone = phone
    }

    get cpf() {
        return this.props.cpf
    }

    get email() {
        return this.props.email
    }

    get peopleType() {
        return this.props.peopleType
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt!
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt
    }

    get status() {
        return this.props.status!
    }

    set status(status: Status) {
        this.updatePropries()
        this.props.status = status
    }

    updatePropries() {
        this.props.updatedAt = new Date()
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
            status: props.status ?? Status.ACTIVE
        }, 
        id ?? new UniqueEntityId())
    }
}