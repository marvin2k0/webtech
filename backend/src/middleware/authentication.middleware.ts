import { Request, Response, NextFunction } from "express";
import { error } from "../model/http/rest-response";
import { logger } from "../utils/Logger";
import jwt from 'jsonwebtoken';
import User, {UserDetails} from "../model/user.model";


/**
 * Function to check that checks the login status of the user
 * @param req - HTTP-Request
 * @param res - HTTP-Response
 * @param next - The function (route) that is supposed to be secured
 */
export async function authenticate(req: Request, res: Response, next: NextFunction): void | Promise<void> {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json(error("Unauthorized"));
        return ;
    }

    // We are using token type Bearer
    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json(error("Unauthorized"));
        return ;
    }

    try {
        // @ToDo: refactoring + we might want to add something different into the header!
        const username = jwt.verify(token, process.env.AUTH_TOKEN_SECRET!);

        const user = await User.findOne({username: username});

        if (!user || !user.active) {
            res.status(401).json(error("Unauthorized"));
        }

        // @ts-ignore @ToDo:    We dont want any type errors!
        // We pass the decoded username in the header to use in the next function
        req.username = username;
        next();
    } catch (error) {
        logger.error("An error occurred while processing token: " + error);
        res.status(403).json({ message: 'Forbidden' });
        return ;
    }

}