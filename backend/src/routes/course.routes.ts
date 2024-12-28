import {Router} from "express";
import {createCourse, deleteCourse, getAllCourses} from "../controller/course.controller";
import {authenticate} from "../middleware/authentication.middleware";
import {handleRole} from "../middleware/role.auth.middleware";
import {UserRole} from "../model/user.model";

const router = Router()

router.get("/", getAllCourses)
router.post("/", createCourse)
router.delete("/:courseName", authenticate, handleRole(UserRole.ADMIN), deleteCourse)

export default router