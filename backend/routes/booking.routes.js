import express from "express"
import { bookAppointment, DashboardStats, deleteBooking, getBooking, getUserBookings, joinCall, verifyPayment } from "../controllers/booking.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/create-booking", protectRoute, bookAppointment)
router.get("/verify", verifyPayment)
router.get("/", protectRoute, getBooking)
router.delete("/:id", protectRoute, deleteBooking)

router.get("/join/:bookingId", protectRoute, joinCall);
router.get("/user-bookings", protectRoute, getUserBookings)
router.get("/dashboard-stats", protectRoute, DashboardStats)




export default router