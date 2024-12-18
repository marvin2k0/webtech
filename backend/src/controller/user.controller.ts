import {Request, Response, NextFunction} from "express";
import User from "../model/user.model";
import {logger} from "../utils/Logger";

// TODO Abfrage aus db
/*
export const getUserDetails = (req: Request, res: Response) => {
    res.status(200).json(users.find(user => user.username === req.params.username))
}
 */

export const getToken = (req: Request, res: Response) => {

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
 * Endpoint for creating a user
 * @param req - the HTTP-Request. Must contain at least username, email and password as json body
 * @param res - HTTP-Response with a status message. Either success or Internal Server Error
 * @param next - ErrorHanding function
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    // @ToDo:   Generate a password hash + salt
    const passwordHash = password
    const salt = "sdfsf";

    try {
        const user = new User({ username, email, passwordHash, salt });
        await user.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        next(error)
    }
}