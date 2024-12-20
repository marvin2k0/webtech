import { Request, Response } from "express";
import { logger } from "../utils/Logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
    logger.error(err)
    res.status(500)
        .json({ message: "Internal Server Error", debug: process.env.IS_DEVELOPMENT_MODE! === "true" ? err.message : undefined })
}