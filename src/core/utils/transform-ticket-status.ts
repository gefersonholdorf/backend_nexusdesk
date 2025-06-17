export class TransformTicketStatus {
    static toTransform(status: number) {
        switch(status) {
            case 1:
                return 'EM ABERTO';
            case 2:
                return 'EM ANDAMENTO';
            case 3:
                return 'EM VALIDAÇÃO';
            case 4:
                return 'AGUARDANDO ESCLARECIMENTO';
            case 5:
                return 'CANCELADO';
            case 6:
                return 'CONCLUÍDO';
        }
    }
}