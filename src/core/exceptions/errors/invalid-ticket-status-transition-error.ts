export class InvalidTicketStatusTransitionError extends Error {
    constructor(message: string) {
        super(message)
    }
}