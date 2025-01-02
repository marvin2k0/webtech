import {WebtechError} from "./webtech.error";

export class InsufficientRoleError extends WebtechError {
    constructor() {
        super(403, "The action you were trying to perform requires a higher role.");
        this.name = "InsufficientRoleError"
        Object.setPrototypeOf(this, InsufficientRoleError.prototype);
    }
}