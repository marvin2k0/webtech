import { Schema, model } from "mongoose";


export interface FileDetails {
    filename: string,
    fileType: string,
    fileContent: string, // Use Base64 encoded file for multiple servers OR
    fileUrl: string, // use FileUrl so there is not so much data in the db
    fileSize: number,
    lastModified: Date,
    uploadedBy: string,
    updatedAt: Date,
    course?: string, // Either a course or visibility is needed. If nothing is provided we jsut use vis = Default
    visibility?: visibilityTypes,
    isValidated?: boolean, // Moderators can Validate the file
}

export enum visibilityTypes {
    DEFAULT = 0, // Default = Public
    PUBLIC = 0, // Everyone can see
    PRIVATE = 1 // Only Moderators, Admins and the person that uploaded can see
}

const fileSchema = new Schema<FileDetails>({

})