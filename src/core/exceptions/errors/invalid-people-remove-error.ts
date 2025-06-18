export class InvalidPeopleRemoveError extends Error{
    constructor() {
        super('Removal denied: the person is linked to one or more tickets.')
    }
}