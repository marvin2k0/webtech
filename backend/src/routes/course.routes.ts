import {Router} from "express";
import {createCourse, deleteCourse, getAllCourses} from "../controller/course.controller";
import {authenticate} from "../middleware/authentication.middleware";

const router = Router()

router.get("/", getAllCourses)
router.post("/", createCourse)
router.delete("/:courseName", authenticate, deleteCourse)

export default router