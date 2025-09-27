import express from "express";
import cors from "cors";
import session from "express-session";
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
    "https://gehgeh-official.vercel.app",   // deployed frontend
  ],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// // SESSION
// app.use(session({
//   secret: process.env.JWT_SECRET_KEY,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,       // cannot be accessed by client JS
//     secure: true,         // must be true for HTTPS (ngrok is HTTPS)
//     sameSite: "none",     // allow cross-site cookies
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   }
// }));

// ROUTES
app.get('/', (req, res)=>res.send('Hello from server'))

app.use("/api/auth", authRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/booking", bookingRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connDB();
});
