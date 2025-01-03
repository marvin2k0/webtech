import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UP_DOWN_PREFIX = "file_"

export interface FileDetails {
    rndFilename: string;
    filename: string,
    fileType: string,
    fileUrl: string,
    fileSize: number,
    lastModified?: number,
    uploadedBy: string, // author (usernmae)
    uploadedAt?: number,
    course?: string, // Either a course or visibility is needed.
    visibility?: VisibilityTypes,
    isValidated: boolean, // Moderators can Validate the file
    validatedBy?: string,
    upVotes: number,
    downVotes: number,
    voteId: string,
}

export enum VisibilityTypes {
    PUBLIC = 0, // Everyone can see
    PRIVATE = 1 // Only Moderators, Admins and the person that uploaded can see
}

const fileSchema = new Schema<FileDetails>({
    rndFilename: {
        type: String,
        required: true,
        unique: true,
    },
    filename: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    lastModified: {
        type: Number,
        required: false,
        default: new Date().getTime(),
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Number,
        required: false,
        default: new Date().getTime(),
    },
    course: {
        type: String,
        required: false,
    },
    visibility: {
        type: Number,
        required: false
    },
    isValidated: {
        type: Boolean,
        required: true,
        default: false
    },
    validatedBy: {
        type: String,
        required: false
    },
    upVotes: {
        type: Number,
        required: false,
        default: 0
    },
    downVotes: {
        type: Number,
        required: false,
        default: 0
    },
    voteId: {
        type: String,
        required: true,
        default: UP_DOWN_PREFIX + uuidv4()
    }
})

export default model<FileDetails>("File", fileSchema)