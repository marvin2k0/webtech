import { Response, NextFunction } from "express";
import { error } from "../model/http/rest-response";
import { logger } from "../utils/Logger";
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import User, {UserDetails} from "../model/user.model";


/**
 * Function to check that checks the login status of the user
 * @param req - HTTP-Request
 * @param res - HTTP-Response
 * @param next - The function (route) that is supposed to be secured
 */
export async function authenticate(req: any, res: Response, next: NextFunction) {
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
        const decodedToken: any = jwt.verify(token, process.env.AUTH_TOKEN_SECRET!);
        const username: string = decodedToken.username;
        const role: string = decodedToken.role
        const user = await User.findOne({username});

        if (!user || !user.active) {
            res.status(401).json(error("Unauthorized"));
        }

        req.username = username;
        req.role = role;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError)
            logger.warn("Token has expired")
        else
            logger.error("An error occurred while processing token: " + err);

        res.status(403).json(error("Forbidden"));
    }

}