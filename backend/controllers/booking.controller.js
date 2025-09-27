import Appointment from "../models/appointment.models.js";
import Booking from "../models/booking.models.js";
import axios from "axios";
import { generateStreamToken } from "../lib/stream.js";
import User from "../models/user.models.js";

export const bookAppointment = async (req, res) => {
  try {
    const { slotId } = req.body;
    const userId = req.user._id;

    // 1. Find the appointment slot
    const slot = await Appointment.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // 2. Create booking
    const booking = await Booking.create({
      user: userId,
      slot: slotId,
      amount: 200000, // ₦200k fixed
      paymentStatus: "pending",
    });


    // 3. Initialize Paystack payment
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email, // email of logged-in user
        amount: booking.amount * 100, // convert ₦200k to kobo
        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 4. Save reference to booking
    booking.paymentReference = response.data.data.reference;
    await booking.save();

    // 5. Return Paystack payment link
    res.status(201).json({
      message: "Booking created, proceed to payment",
      bookingId: booking._id,
      paymentUrl: response.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Error booking appointment:", error.response?.data || error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;

    // 1. Find booking in DB
    const booking = await Booking.findOne({ paymentReference: reference });
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found for this reference" });
    }

    // 2. Verify with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    // 3. Update DB based on payment result
    if (response.data.data.status === "success") {
  booking.paymentStatus = "paid";

  if (!booking.callId) {
    const callId = `call_${booking._id}`;
    booking.callId = callId;
    booking.callUrl = `${process.env.FRONTEND_URL}/join/${callId}`;
  }

  // Mark slot as booked only now
  await Appointment.findByIdAndUpdate(booking.slot, { isBooked: true });

  // ✅ Save booking updates
  await booking.save();

  return res.json({
    success: true,
    message: "Payment successful",
    booking: {
      ...booking.toObject(),
      callUrl: booking.callUrl,
      callId: booking.callId,
    },
  });
}
 else {
      booking.paymentStatus = "failed";
      await booking.save();

      return res.json({
        success: false,
        message: "Payment failed",
        booking,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

export const joinCall = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    // 1. Find booking
    const booking = await Booking.findById(bookingId).populate("slot");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2. Ensure payment is complete
    if (booking.paymentStatus !== "paid") {
      return res.status(403).json({ message: "Payment required before joining" });
    }

    // 3. Combine date + time properly
const slotDateRaw = new Date(booking.slot.date);
let [hoursStr, minutesStr] = booking.slot.time.replace(/AM|PM/i, "").trim().split(":");
let hours = Number(hoursStr);
let minutes = Number(minutesStr || 0);

// Convert AM/PM to 24h
if (/PM/i.test(booking.slot.time) && hours < 12) hours += 12;
if (/AM/i.test(booking.slot.time) && hours === 12) hours = 0;

// Local slot date
const slotDate = new Date(
  slotDateRaw.getFullYear(),
  slotDateRaw.getMonth(),
  slotDateRaw.getDate(),
  hours,
  minutes,
  0,
  0
);

const now = new Date();
const earlyJoinWindow = 5 * 60 * 1000; // 5 minutes
const gracePeriod = 2 * 60 * 60 * 1000; // 2 hours

// Allow join 5 min before actual slot
if (!req.user.isAdmin && slotDate.getTime() - now.getTime() > earlyJoinWindow) {
  return res.status(403).json({
    message: "You can only join when appointment time has started (5 min early allowed)",
  });
}

// Block expired calls (after 2 hours)
if (!req.user.isAdmin && now - slotDate > gracePeriod) {
  return res.status(403).json({
    message: "This appointment has expired",
  });
}

    // 4. Generate Stream token
    const token = generateStreamToken(userId.toString());

    // 5. Define callId (unique per booking)
    const callId = `call_${booking._id}`;

    res.json({
      success: true,
      token,
      callId,
      userId,
      paymentStatus: booking.paymentStatus,
      slot: {
        date: booking.slot.date,
        time: booking.slot.time,
      },
    });
  } catch (error) {
    console.error("Error joining call:", error);
    res.status(500).json({ message: "Failed to join call" });
  }
};


export const getBooking = async (req, res) => {
  try {
    const book = await Booking.find().sort({ createdAt: -1 }).populate("user", "username email").populate("slot", "date time isBooked");
    res.json(book);
  } catch (error) {
    console.log("Error in getBooking controller", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
}

export const deleteBooking = async (req, res)=>{
    try {
        const Book = await Booking.findById(req.params.id)
        if(!Book){
            return res.status(401).json({ message: "Booking not found"})
        }
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Booking deleted successfully"});
    } catch (error) {
    console.log("Error in deleteBooking controller", error);
    res.status(500).json({ message: "Internal Server Error"});
    }
}


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
   
    res.json(bookings);       
  } catch (error) {
    console.log("Error in getUserBookings controller", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
}

export const DashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalClients = await User.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$amount" } }, // convert string to number
        },
      },
    ]);

    res.json({
      totalAppointments,
      totalClients,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    console.log("Error in DashboardStats controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

