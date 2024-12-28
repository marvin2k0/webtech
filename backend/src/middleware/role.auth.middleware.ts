import {UserRole} from "../model/user.model";
import {NextFunction, Request, Response} from "express";
import {InsufficientRoleError} from "../error/insufficient.role.error";

export const handleRole = (neededRole: UserRole) => {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            if (req.role < neededRole)
                throw new InsufficientRoleError();

            next()
        } catch (error: unknown) {
            next(error)
        }
    }
}