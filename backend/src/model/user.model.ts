import {Schema, model} from "mongoose";

interface UserDetails {
    username: string,
    email: string,
    dateOfBirth?: number,
    fieldOfInterests?: [],
    enrolledCourses?: [],
    role?: UserRole,
    created?: number,
    lastLogin?: number,
    profilePicture?: string,
    active?: boolean
}

enum UserRole {
    DEFAULT,
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
    // TODO: Brauchen wir überhaupt profilbilder? Sollen wir nicht einfach den Anfangsbuchstaben des Usernames nehmen,
    // TODO: wie bei Google Diensten?
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