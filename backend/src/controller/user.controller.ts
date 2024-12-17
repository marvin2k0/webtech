import {Request, Response} from "express";

const users: UserDetails[] = []
const userMap: Map<string, UserDetails> = new Map<string, UserDetails>()

export const getUserDetails = (req: Request, res: Response) => {
    res.status(200).json(users.find(user => user.username === req.params.username))
}

export const createUser = (req: Request, res: Response) => {
    users.push({
        username: "marvinmustermann",
        email: "test@test.com",
        role: UserRole.DEFAULT,
        created: new Date().getTime(),
        lastLogin: new Date().getTime() - 1000 * 60,
        active: true
    })

    res.status(200).json({"message": "Success"})
}

interface UserDetails {
    username: string,
    email: string,
    dateOfBirth?: number,
    fieldOfInterest?: string,
    enrolledCourses?: [],
    role: UserRole,
    created: number,
    lastLogin: number,
    profilePicture?: string,
    active: boolean
}

enum UserRole {
    DEFAULT,
    ADMIN
}
