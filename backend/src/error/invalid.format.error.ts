import {WebtechError} from "./webtech.error";

export class InvalidFormatError extends WebtechError {
    constructor() {
        super(400, "Invalid Format");
        this.name = "InvalidFormatError"
        Object.setPrototypeOf(this, InvalidFormatError.prototype);
    }
}