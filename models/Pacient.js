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
        unique: true,
        validate: {
        validator: function (v) {
            return /\d{2} 9\d{4}-\d{4}/.test(v);
        },
        message: props => {`
            ${props.value} is not a valid phone number!. 
            Please use the format: XX 9XXXX-XXXX`
        }
    }
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Pacient = mongoose.model("Pacient", pacientSchema);

export default Pacient;