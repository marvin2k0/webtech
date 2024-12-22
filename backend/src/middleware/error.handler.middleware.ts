import {json, Request, Response} from "express";
import {logger} from "../utils/Logger";

export const errorHandler = (err: any, req: Request, res: Response, next: any) => {
    logger.error(err)
    res.status(500)
        .json({message: "fehler"})
}