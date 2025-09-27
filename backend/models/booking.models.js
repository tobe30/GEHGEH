import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    amount: {
      type: Number,
      default: 200000, // ₦200k
    },
    paymentReference: {
      type: String, // from Paystack
    },

    // ✅ new fields for video call
    callId: {
      type: String,
      default: null,
    },
    callUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
