import {Request, Response, NextFunction} from "express";
import User, {UserDetails} from "../model/user.model";
import {logger} from "../utils/Logger";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {error, success} from "../model/http/rest-response";

/**
 * Used to obtain a fresh jwt token for the received user. Token is only provided when password matches
 *
 * @param req - Http-Request
 * @param res - Http-Response
 */
export const getToken = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const passwordHash = await getUserPasswordHash(username)
    const validPassword = await bcrypt.compare(password, passwordHash)

    if (validPassword) {
        const token = jwt.sign(username, process.env.AUTH_TOKEN_SECRET!)

        logger.debug(`User ${username} successfully authenticated`)
        res.status(200)
            .json(success<{ accessToken: string }>({accessToken: token}))
    } else {
        logger.warn(`There was a problem authenticating user ${username}`)
        res.status(401)
            .json(error("Wrong credentials"))
    }
}

/**
 * Get a list of all users
 * @param req - Http-Request
 * @param res - Http-Response
 * @param next - Error handling function
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.find({})
        res.status(200).json({message: data})
    } catch (error) {
        next("error nachricht")
    }
}

/**
 * Function to retrieve the own user information
 * @param req - The Request
 * @param res - The HTTP-Response
 * @param next - Error-Handling function
 */
export const getPersonalInformation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.user;
        const userData = await User.findOne({ username });
        res.status(200).json(userData);
    } catch (err) {
        next(err)
    }
}

/**
 * Get the Data of the requestet User (param username)
 * @param req - The Request
 * @param res - The HTTP-Response
 * @param next - Error-Handling function
 */
export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;

    try {
        const userData = await User.findOne({ username });
        res.status(200).json(userData);

    } catch (err) {
        next(err)
    }
}

/**
 * Endpoint for creating a user
 * @param req - the HTTP-Request. Must contain at least username, email and password as json body
 * @param res - HTTP-Response with a status message. Either success or Internal Server Error
 * @param next - ErrorHanding function
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 15)
        logger.debug(passwordHash)
        const user = new User({ username, email, passwordHash });
        await user.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        next(error)
    }
}

export async function getUserPasswordHash(findUsername: string): Promise<string> {
    const userFound = await User.findOne({username: findUsername}).exec()

    if (!userFound)
        return ""

    return userFound.passwordHash
}