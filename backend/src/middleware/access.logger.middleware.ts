import {NextFunction, Request, Response} from "express";
import {logger} from "../utils/Logger";

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.ip}: ${req.method} ${req.originalUrl}`)
    next()
}