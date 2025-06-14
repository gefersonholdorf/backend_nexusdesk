import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import type { People } from "./people";

export interface ClientProps {
    id?: UniqueEntityId,
    client: People
}

export class Client extends EntityBase<ClientProps> {

    get client() {
        return this.props.client
    }

    static create(props: ClientProps, id?: UniqueEntityId) {
        return new Client({
            client:  props.client,
        }, 
        id ?? new UniqueEntityId())
    }
}