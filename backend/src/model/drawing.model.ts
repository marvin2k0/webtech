import {model, Schema} from "mongoose";

export interface DrawingDetails {
    rndFilename: string;
    drawing: string;
}

const drawingSchema = new Schema<DrawingDetails>({
    rndFilename: {
        type: String,
        required: true,
        unique: true
    },
    drawing: {
        type: String,
        required: true
    },
})

export default model<DrawingDetails>("Drawing", drawingSchema);
