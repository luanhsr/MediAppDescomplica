import {mongoose} from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    birthDate: {
        type: Date,
        required: [false, "Birth date is not obligatory"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
