import {Response, NextFunction} from "express";
import {success} from "../model/http/rest-response";
import CommentModel, {CommentDetails} from "../model/comment.model";
import VoteModel, {VoteDetails} from "../model/vote.model";
import {EntityNotFoundError} from "../error/entity.not.found.error";
import {ObjectId} from "mongodb";

export const getVotes = async (req: any, res: Response, next: NextFunction) => {
    try {
        const referenceId = req.params.referenceId
        const userId = req.userId
        const vote: VoteDetails | null = await VoteModel.findOne({referenceId})

        if (!vote) {
            res.status(200).json(success({
                upvote: false,
                downvote: false,
                upvotes: 0,
                downvotes: 0
            }))
            return
        }

        const isUpvote = vote.upvotes.some(uid => new ObjectId(userId).equals(uid))

        res.status(200).json(success({
            upvote: isUpvote,
            downvote: !isUpvote,
            upvotes: vote.upvotes.length,
            downvotes: vote.downvotes.length
        }))
    } catch (error: unknown) {
        next(error)
    }
}

export const upvote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const referenceId = req.body.referenceId
        const userId = req.userId
        const vote: VoteDetails = await VoteModel.findOneAndUpdate({referenceId}, {$addToSet: {upvotes: userId}, $pull: {downvotes: userId}}, {upsert: true, new: true})
        const isUpvote = vote.upvotes.some(uid => new ObjectId(userId).equals(uid))

        res.status(200).json(success({
            upvote: isUpvote,
            downvote: !isUpvote,
            upvotes: vote.upvotes.length,
            downvotes: vote.downvotes.length
        }))
    } catch (error: unknown) {
        next(error)
    }
}

export const downvote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const referenceId = req.body.referenceId
        const userId = req.userId
        const vote: VoteDetails = await VoteModel.findOneAndUpdate({referenceId}, {$addToSet: {downvotes: userId}, $pull: {upvotes: userId}}, {upsert: true, new: true})
        const isUpvote = vote.upvotes.some(uid => new ObjectId(userId).equals(uid))

        res.status(200).json(success({
            upvote: isUpvote,
            downvote: !isUpvote,
            upvotes: vote.upvotes.length,
            downvotes: vote.downvotes.length
        }))
    } catch (error: unknown) {
        next(error)
    }
}

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

        const responseToSend = await comment.populate("author", "username")

        res.status(200)
            .json(success(responseToSend))
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