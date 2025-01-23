import {Router} from "express";
import {authenticate} from "../middleware/authentication.middleware";
import {getMyComments, postComment} from "../controller/interaction.controller";

const router: Router = Router()

router.post("/", authenticate, postComment)
router.get("/comments", authenticate, getMyComments)

export default router