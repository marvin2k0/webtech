import {Response, NextFunction} from "express";
import {logger} from "../utils/Logger";
import {success} from "../model/http/rest-response";
import CommentModel, {CommentDetails} from "../model/comment.model";

export const getCommentByReference = async (req: any, res: Response, next: NextFunction) => {
    try {
        const referenceId = req.query.referenceId
        const comments: CommentDetails[] = await CommentModel.find({referenceId: referenceId})
            .populate("author", "username")
            .populate({
                path: 'replies',
                select: 'author comment timestamp',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .sort({timestamp: -1})

        res.status(200)
            .json(success(comments))
    } catch (error: unknown) {
        next(error)
    }
}

export const postComment = async (req: any, res: Response, next: NextFunction)=>  {
    try {
        const userId = req.userId
        const referenceId = req.body.referenceId
        const commentText = req.body.text
        const comment = new CommentModel({author: userId, comment: commentText, referenceId, timestamp: Date.now()})

        await comment.save()
        await CommentModel.findByIdAndUpdate(referenceId, {$addToSet: { replies:  comment._id }})

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