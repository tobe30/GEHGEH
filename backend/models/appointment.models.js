import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        time:{
            type: String,
            required:true
        },
        isBooked:{
            type: Boolean,
            default: false,
        }
     },{ timestamps: true }
)

const Appointment = mongoose.model("Appointment", appointmentSchema)

export default Appointment