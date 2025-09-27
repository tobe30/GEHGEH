import express from "express"
import { CreateAppointment, deleteAppointment, getAppointments } from "../controllers/appointment.controller.js"
import { protectRoute, verifyAdmin } from "../middleware/auth.middleware.js"

const router = express.Router()

// Admin-only routes
router.post("/create-appointment", protectRoute, verifyAdmin, CreateAppointment);
router.get("/", getAppointments);
router.delete("/:id", protectRoute, verifyAdmin, deleteAppointment);



export default router