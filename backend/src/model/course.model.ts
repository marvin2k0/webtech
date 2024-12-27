import {model, Schema} from "mongoose";

export interface CourseDetails {
    name: string,
    description: string,
    members: string[] // user ids, TODO herausfindenn, ob fk ref möglich ist
    // TODO: add more
}

const courseSchema = new Schema<CourseDetails>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: [],
        required: false
    }
})

export default model<CourseDetails>("Course", courseSchema)
