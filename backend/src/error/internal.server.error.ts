import {WebtechError} from "./webtech.error";

export class InternalServerError extends WebtechError {
    constructor() {
        super(500, "Internal Server Error");
        this.name = "InternalServerError";
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}