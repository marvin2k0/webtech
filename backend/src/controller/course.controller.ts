import {NextFunction, Request, Response} from "express";
import {success} from "../model/http/rest-response";
import Course, {CourseDetails} from "../model/course.model";
import {EntityNotFoundError} from "../error/entity.not.found.error";

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await Course.find({})
        res.status(200).json(success(courses))
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

const getCourseByName = async (name: string): Promise<CourseDetails> => {
    const courseFound = await Course.findOne({
        name: {$regex: `^${name}$`, $options: "i"}
    });

    if (!courseFound) {
        throw new EntityNotFoundError("Course")
    }

    return courseFound
}
