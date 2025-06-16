import { Module } from "@nestjs/common";
import { CreateClientController } from "./controllers/client/create-client-controller";
import { CreateClientUseCase } from "src/domain/support-core/application/use-cases/client/create-client-use-case";
import { DatabaseModule } from "../database/database.module";
import { UpdateClientController } from "./controllers/client/update-client-controller";
import { UpdateClientUseCase } from "src/domain/support-core/application/use-cases/client/update-client-use-case";
import { GetClientByIdController } from "./controllers/client/get-client-by-id-controller";
import { GetClientByIdUseCase } from "src/domain/support-core/application/use-cases/client/get-client-by-id-use-case";
import { FetchClientsController } from "./controllers/client/fetch-clients-controller";
import { FetchClientsUseCase } from "src/domain/support-core/application/use-cases/client/fetch-clients-use-case";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CreateClientController, UpdateClientController, GetClientByIdController, FetchClientsController
    ],
    providers: [
        CreateClientUseCase, UpdateClientUseCase, GetClientByIdUseCase, FetchClientsUseCase
    ]
})
export class HttpModule{}