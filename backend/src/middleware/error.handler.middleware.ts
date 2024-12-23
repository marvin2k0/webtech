import { Request, Response } from "express";
import { logger } from "../utils/Logger";
import {error} from "../model/http/rest-response";

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
    logger.error(err);

    const errorMessage = process.env.IS_DEVELOPMENT_MODE! === "true" ? err : "";

    res.status(200)
        .json(error(errorMessage))
}