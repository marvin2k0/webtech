import {model, Schema} from "mongoose";

export interface VoteDetails {
    referenceId: string,
    upvotes: string[],
    downvotes: string[]
}

const voteSchema = new Schema<VoteDetails>({
    referenceId: {
        required: true,
        type: String,
        unique: true
    },
    upvotes: {
        required: false,
        type: [],
        ref: "User"
    },
    downvotes: {
        required: false,
        type: [],
        ref: "User"
    }
})

export default model<VoteDetails>("Vote", voteSchema)
