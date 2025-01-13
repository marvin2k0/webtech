import {WebtechError} from "./webtech.error";

export class ConflictError extends WebtechError {
    constructor(message: string) {
        super(409, message);
        this.name = "ConflictError"
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}