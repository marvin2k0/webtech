import {Router} from "express";
import {authenticate} from "../middleware/authentication.middleware";
import {getCommentByReference, getMyComments, postComment} from "../controller/interaction.controller";

const router: Router = Router()

router.post("/", authenticate, postComment)
router.get("/comments", authenticate, getMyComments)
router.get("/find", getCommentByReference)

export default router