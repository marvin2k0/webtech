import {Schema, model} from "mongoose";

export const EMPTY_USER: UserDetails = {
    username: "",
    email: "",
    passwordHash: ""
}

export interface UserDetails {
    username: string,
    email: string,
    passwordHash: string,
    dateOfBirth?: number,
    fieldOfInterests?: [],
    enrolledCourses?: [],
    role?: UserRole,
    created?: number,
    lastLogin?: number,
    profilePicture?: string,
    active?: boolean
}

export enum UserRole {
    DEFAULT,
    MODERATOR,
    ADMIN
}

const userSchema = new Schema<UserDetails>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Number,
        required: false
    },
    fieldOfInterests: {
        type: [],
        required: false
    },
    enrolledCourses: {
        type: [],
        required: false
    },
    role: {
        type: Number,
        required: false,
        default: UserRole.DEFAULT
    },
    created: {
        type: Number,
        required: false,
        default: new Date().getTime()
    },
    lastLogin: {
        type: Number,
        required: false,
        default: 0
    },
    profilePicture: {
        type: String,
        required: false,
        default: ""
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    }
})

export default model<UserDetails>("User", userSchema)