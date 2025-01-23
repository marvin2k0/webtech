import {Response, NextFunction} from "express";
import {logger} from "../utils/Logger";
import {success} from "../model/http/rest-response";
import CommentModel, {CommentDetails} from "../model/comment.model";

export const postComment = async (req: any, res: Response, next: NextFunction)=>  {
    try {
        const username = req.username
        const userId = req.userId
        const commentText = req.body.text

        logger.debug(`${username} wants to comment ${commentText}`)

        const comment = new CommentModel({author: userId, comment: commentText})
        await comment.save()

        res.status(200)
            .json(success(comment._id))
    } catch (error: unknown) {
        next(error)
    }
}

export async function getMyComments(req: any, res: Response, next: NextFunction) {
    const userId = req.userId
    const comments: CommentDetails[] = await CommentModel.find({author: userId}).populate("author", "username")

    res.status(200)
        .json(success(comments))
}