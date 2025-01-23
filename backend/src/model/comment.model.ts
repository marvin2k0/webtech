import {model, Schema} from "mongoose";

export interface CommentDetails {
    author: string,
    comment: string,
    replies: []
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
    replies: {
        required: false,
        type: [],
        unique: false
    }
})

export default model<CommentDetails>("Comment", commentSchema)
