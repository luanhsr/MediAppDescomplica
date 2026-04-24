import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    birthDate: {
        type: Date
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

const Pacient = mongoose.model("Pacient", pacientSchema);

export default Pacient;