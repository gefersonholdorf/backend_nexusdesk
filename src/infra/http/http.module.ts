import { Module } from "@nestjs/common";
import { CreateClientController } from "./controllers/client/create-client-controller";
import { CreateClientUseCase } from "src/domain/support-core/application/use-cases/client/create-client-use-case";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CreateClientController
    ],
    providers: [
        CreateClientUseCase
    ]
})
export class HttpModule{}