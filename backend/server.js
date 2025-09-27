import express from "express";
import cors from "cors";
import "dotenv/config";
import { connDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",              // local dev
    "https://gehgeh-official.vercel.app", // deployed frontend
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => res.send("Hello from server"));
app.use("/api/auth", authRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/booking", bookingRoutes);

// ✅ Start server only after DB is connected
const startServer = async () => {
  try {
    await connDB(); // wait for MongoDB to connect
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
