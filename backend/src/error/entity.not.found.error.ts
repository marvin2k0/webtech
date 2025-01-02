import {WebtechError} from "./webtech.error";

export class EntityNotFoundError extends WebtechError {
    constructor(entity: string) {
        super(404, `${entity} was not found`);
        this.name = "EntityNotFoundError"
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}