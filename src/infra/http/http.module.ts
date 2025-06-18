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
import { CreateOperatorController } from "./controllers/operator/create-operator-controller";
import { UpdateOperatorController } from "./controllers/operator/update-operator-controller";
import { GetOperatorByIdController } from "./controllers/operator/get-operator-by-id-controller";
import { FetchOperatorsController } from "./controllers/operator/fetch-operators-controller";
import { CreateOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/create-operator-use-case";
import { UpdateOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/update-operator-use-case";
import { GetOperatorByIdUseCase } from "src/domain/support-core/application/use-cases/operator/get-client-by-id-use-case";
import { FetchOperatorsUseCase } from "src/domain/support-core/application/use-cases/operator/fetch-operators-use-case";
import { CreateTicketController } from "./controllers/tickets/create-ticket-controller";
import { CreateTicketUseCase } from "src/domain/support-core/application/use-cases/ticket/create-ticket-use-case";
import { GetTicketByIdController } from "./controllers/tickets/get-ticket-by-id-controller";
import { GetTicketByIdUseCase } from "src/domain/support-core/application/use-cases/ticket/get-ticket-by-id-use-case";
import { TicketStatusTransitionController } from "./controllers/tickets/ticket-status-transition-controller";
import { TicketStatusTransitionUseCase } from "src/domain/support-core/application/use-cases/ticket/ticket-status-transition-use-case";
import { AssignOperatorToTickerController } from "./controllers/tickets/assign-operator-to-ticker-controller";
import { AssignOperatorToTickerUseCase } from "src/domain/support-core/application/use-cases/ticket/assign-operator-to-ticker-use-case";
import { FetchTicketsController } from "./controllers/tickets/fetch-tickets-controller";
import { FetchTicketsUseCase } from "src/domain/support-core/application/use-cases/ticket/fetch-tickets-use-case";
import { FetchTicketsByPeopleIdController } from "./controllers/tickets/fetch-tickets-by-people-id-controller";
import { FetchTicketsByPeopleIdUseCase } from "src/domain/support-core/application/use-cases/ticket/fetch-ticket-by-operator-id-use-case";
import { DeleteClientController } from "./controllers/client/delete-client-controller";
import { DeleteOperatorController } from "./controllers/operator/delete-operator-controller";
import { DeleteClientUseCase } from "src/domain/support-core/application/use-cases/client/delete-client-by-id-use-case";
import { DeleteOperatorUseCase } from "src/domain/support-core/application/use-cases/operator/delete-operator-use-case";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CreateClientController, UpdateClientController, GetClientByIdController, FetchClientsController,
        CreateOperatorController, UpdateOperatorController, GetOperatorByIdController, FetchOperatorsController,
        CreateTicketController, GetTicketByIdController, TicketStatusTransitionController, AssignOperatorToTickerController,
        FetchTicketsController, FetchTicketsByPeopleIdController, DeleteClientController, DeleteOperatorController
    ],
    providers: [
        CreateClientUseCase, UpdateClientUseCase, GetClientByIdUseCase, FetchClientsUseCase,
        CreateOperatorUseCase, UpdateOperatorUseCase, GetOperatorByIdUseCase, FetchOperatorsUseCase,
        CreateTicketUseCase, GetTicketByIdUseCase, TicketStatusTransitionUseCase, AssignOperatorToTickerUseCase,
        FetchTicketsUseCase, FetchTicketsByPeopleIdUseCase, DeleteClientUseCase, DeleteOperatorUseCase
    ]
})
export class HttpModule{}