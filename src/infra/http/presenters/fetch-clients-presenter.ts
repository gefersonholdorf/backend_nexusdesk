import { TransformDate } from "src/core/utils/transform-date";
import { Client } from "src/domain/support-core/enterprise/entities/client";

export class FetchClientsPresenter {
    static toHttp(peoples: Client[]) {

        return peoples.map((people) => {
            const { client } = people
            return {
                id: people.id.value,
                name: client.name,
                cpf: client.cpf,
                email: client.email,
                enterprise: client.enterprise,
                phone: client.phone,
                status: client.status === 1 ? "ATIVO" : "INATIVO",
                createdAt: TransformDate.Format(client.createdAt!),
                updatedAt: TransformDate.Format(client.updatedAt!)
            }
        })
    }
}