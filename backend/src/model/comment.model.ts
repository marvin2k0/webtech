import {model, Schema} from "mongoose";

export interface CommentDetails {
    author: string,
    comment: string,
    timestamp: number,
    referenceId: string
}

const commentSchema = new Schema<CommentDetails>({
    author: {
        required: true,
        unique: false,
        type: String,
        ref: 'User'
    },
    comment: {
        required: true,
        type: String,
        unique: false
    },
    timestamp: {
        required: false,
        type: Number,
        default: Date.now()
    },
    referenceId: {
        required: true,
        type: String,
        unique: false
    }
})

export default model<CommentDetails>("Comment", commentSchema)
