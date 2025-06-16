import { TransformDate } from "src/core/utils/transform-date";
import type { Operator } from "src/domain/support-core/enterprise/entities/operator";

export class GetOperatorByIdPresenter {
    static toHttp(people: Operator) {
        const { operator } = people

        return {
            id: operator.id.value,
            name: operator.name,
            cpf: operator.cpf,
            email: operator.email,
            enterprise: operator.enterprise,
            phone: operator.phone,
            status: operator.status === 1 ? "ATIVO" : "INATIVO",
            createdAt: TransformDate.Format(operator.createdAt!),
            updatedAt: TransformDate.Format(operator.updatedAt!)
        }
    }
}