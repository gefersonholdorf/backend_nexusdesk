export class ExistingEmailError extends Error {
    constructor() {
        super('Existing email.')
    }
}