import {mongoose} from "mongoose";

const Schema = mongoose.Schema;
const prescriptionSchema = new Schema({ 

    prescriptionId: {
        type: String,
        required: [true, "Prescription ID is required"],
        unique: true
     },
     date: {
        type: Date,
        required: [true, "Date is required"]        ,

     },
     medicine: {
        type: String,
        required: [true, "Medicine is required"]
     },
     dosage: {
        type: String,
        required: [true, "Dosage is required"  ]
     },
     instructions: {
        type: String
     },
     createdAt: {
        type: Date,
        default: Date.now
     }

});