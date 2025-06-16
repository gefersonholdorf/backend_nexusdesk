import { Module } from "@nestjs/common";
import { CreateClientController } from "./controllers/client/create-client-controller";
import { CreateClientUseCase } from "src/domain/support-core/application/use-cases/client/create-client-use-case";
import { DatabaseModule } from "../database/database.module";
import { UpdateClientController } from "./controllers/client/update-client-controller";
import { UpdateClientUseCase } from "src/domain/support-core/application/use-cases/client/update-client-use-case";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CreateClientController, UpdateClientController
    ],
    providers: [
        CreateClientUseCase, UpdateClientUseCase
    ]
})
export class HttpModule{}