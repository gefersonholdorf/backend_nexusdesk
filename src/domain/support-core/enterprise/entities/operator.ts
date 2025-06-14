import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import type { People } from "./people";

export interface OperatorProps {
    id?: UniqueEntityId,
    operator: People
}

export class Operator extends EntityBase<OperatorProps> {

    get operator() {
        return this.props.operator
    }

    static create(props: OperatorProps, id?: UniqueEntityId) {
        return new Operator({
            operator: props.operator,
        }, 
        id ?? new UniqueEntityId())
    }
}