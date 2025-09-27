import Appointment from "../models/appointment.models.js"

//create booking
export const CreateAppointment = async (req, res) => {
    try {
        const {date, time} = req.body

        const exist = await Appointment.findOne({date, time})
        if (exist) return res.status(400).json({ message: "Slot already taken"})

            const appointment = await Appointment.create({date, time});
            res.status(201).json(appointment)
    } catch (error) {
         console.log("Error in creatAppointment controller", error);
         res.status(500).json({ message: "Internal Server Error"});
    }
}

// Get all slots
export const getAppointments = async (req, res) => {
  try {
    const slots = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(slots);
  } catch (error) {
    console.log("Error in getAppointment controller", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
};


//delete appointment

export const deleteAppointment = async (req, res)=>{
    try {
        const appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            return res.status(401).json({ message: "appointment not found"})
        }
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "appointment deleted successfully"});
    } catch (error) {
    console.log("Error in deleteAppointment controller", error);
    res.status(500).json({ message: "Internal Server Error"});
    }
}