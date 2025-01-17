import {NextFunction, Request, Response} from "express";
import {success} from "../model/http/rest-response";
import Course, {CourseDetails} from "../model/course.model";
import {EntityNotFoundError} from "../error/entity.not.found.error";
import {logger} from "../utils/Logger";
import {ConflictError} from "../error/conflict.error";
import {getUserObjectFromDatabase} from "./user.controller";


export async function joinCourse(req: any, res: Response, next: NextFunction) {
    try {
        const courseId = req.params.courseId
        const username = req.username
        const course = await getCourseById(courseId)
        const userDetails = await getUserObjectFromDatabase(username)
        const userId = userDetails._id
        const members = course.members

        if (members.includes(userId)) {
            logger.warn(`User ${username} was already in course ${course.name}`)
            throw new ConflictError("Username was already in course")
        }

        await Course.updateOne(
            { _id: courseId },
            { $addToSet: { members: userId } }
        )

        res.status(200)
            .json(success(`Added user to course ${course.name}`))
    } catch (err: unknown) {
        next(err)
    }
}

export function leaveCourse(req: Request, res: Response, next: NextFunction) {
    // TODO
}

export async function findCourse(req: Request, res: Response, next: NextFunction) {
    const {name, description} = req.query;
    const attr = {name, description};

    let searchParams: { [key: string]: any }[] = [];

    for (let key in attr) {
        // @ts-ignore
        if (typeof attr[key] !== "undefined" && attr[key] !== null) {
            // @ts-ignore
            searchParams.push({[key]: {$regex: `${attr[key]}`, $options: "i"}})
        }
    }

    try {
        const courses = await Course.find({$or: searchParams});
        res.status(200).send(success(courses));
    } catch (error) {
        console.error("Error fetching courses:", error);
        next(error);
    }
}

export async function findCourseById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.courseId
        const courseFound = await Course.findById(id);

        if (!courseFound) {
            throw new EntityNotFoundError("Course")
        }

        res.status(200)
            .json(success(courseFound))
    } catch (err: unknown) {
        next(err)
    }
}

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    const {name, description} = req.body

    try {
        const course = new Course({name, description})
        await course.save()
        res.status(200)
            .json(success(`Course ${name} has been created`))
    } catch (error: unknown) {
        next(error)
    }
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const courseName = req.params.courseName

    try {
        const course: CourseDetails = await getCourseByName(courseName)
        await Course.deleteOne({name: course.name})

        res.status(200).json(success(`Successfully deleted course ${course.name}`))
    } catch (error: unknown) {
        next(error)
    }
}

const getCourseById = async (id: string): Promise<CourseDetails> => {
    const courseFound = await Course.findById(id);

    if (!courseFound) {
        throw new EntityNotFoundError("Course")
    }

    return courseFound
}

const getCourseByName = async (name: string): Promise<CourseDetails> => {
    const courseFound = await Course.findOne({
        name: {$regex: `^${name}$`, $options: "i"}
    });

    if (!courseFound) {
        throw new EntityNotFoundError("Course")
    }

    return courseFound
}
