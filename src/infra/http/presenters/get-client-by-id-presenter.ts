import { TransformDate } from "src/core/utils/transform-date";
import type { Client } from "src/domain/support-core/enterprise/entities/client";

export class GetClientByIdPresenter {
    static toHttp(people: Client) {
        const { client } = people

        return {
            id: client.id.value,
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            enterprise: client.enterprise,
            phone: client.phone,
            status: client.status === 1 ? "ATIVO" : "INATIVO",
            createdAt: TransformDate.Format(client.createdAt!),
            updatedAt: TransformDate.Format(client.updatedAt!)
        }
    }
}