import {mongoose} from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },
    login: {
        type: String,
        required: [true, "Login is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    medicalSpeciality: {
        type: String,
        required: [true, "Medical specialty is required"]
    },
    medicalRegistration: {
        type: String,
        required: [true, "Medical registration is required"],
        unique: true
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

const doctor = mongoose.model("Doctor", doctorSchema);
export default doctor;
