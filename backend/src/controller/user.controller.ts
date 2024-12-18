import {Request, Response} from "express";
import User from "../model/user.model";

// TODO Abfrage aus db
/*
export const getUserDetails = (req: Request, res: Response) => {
    res.status(200).json(users.find(user => user.username === req.params.username))
}
 */

export const createUser = async (req: Request, res: Response) => {
    const {
        username,
        email,
        dateOfBirth
    } = req.body
    await new User({
        username,
        email,
        dateOfBirth
    }).save()

    res.status(200).json({"message": "Success"})
}
