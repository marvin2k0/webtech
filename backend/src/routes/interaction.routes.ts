import {Router} from "express";
import {authenticate} from "../middleware/authentication.middleware";
import {
    downvote,
    getCommentByReference,
    getMyComments, getVotes,
    postComment,
    upvote
} from "../controller/interaction.controller";

const router: Router = Router()

router.post("/", authenticate, postComment)
router.post("/upvote", authenticate, upvote)
router.post("/downvote", authenticate, downvote)
router.get("/rating/:referenceId", authenticate, getVotes)
router.get("/comments", authenticate, getMyComments)
router.get("/find", getCommentByReference)

export default router