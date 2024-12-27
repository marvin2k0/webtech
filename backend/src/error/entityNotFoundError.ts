export class EntityNotFoundError extends Error {
    constructor(entity: string) {
        super(`${entity} was not found`);
        this.name = "EntityNotFoundError"
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}