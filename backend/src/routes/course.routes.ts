import {Router} from "express";
import {createCourse, deleteCourse, findCourse, findCourseById} from "../controller/course.controller";
import {authenticate} from "../middleware/authentication.middleware";
import {requireRole} from "../middleware/role.auth.middleware";
import {UserRole} from "../model/user.model";

const router = Router()

router.get("/", findCourse)
router.post("/", createCourse)
router.delete("/:courseName", authenticate, requireRole(UserRole.ADMIN), deleteCourse)
router.get("/:courseId", findCourseById)
router.post("/join/:courseId", authenticate, )

export default router