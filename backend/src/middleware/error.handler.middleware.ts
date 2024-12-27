import {NextFunction, Request, Response} from "express";
import {error} from "../model/http/rest-response";
import {Error} from "mongoose";
import {MongoServerError} from "mongodb";
import {EntityNotFoundError} from "../error/entityNotFoundError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MongoServerError) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue)[0];
            const duplicateValue = err.keyValue[duplicateField]

            res.status(400)
                .json(error(`${duplicateField} ${duplicateValue} already exists!`))
        } else {
            res.status(400)
                .json(error(err.message))
        }
        return
    } else if (err instanceof EntityNotFoundError) {
        res.status(400)
            .json(error(err.message))
        return;
    }

    const errorMessage = process.env.IS_DEVELOPMENT_MODE! === "true" ? err : "";

    res.status(500)
        .json({"unknownError": err.message})
}