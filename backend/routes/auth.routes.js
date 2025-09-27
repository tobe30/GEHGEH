import express from "express";
import { login, logout, Register } from "../controllers/auth.controllers.js";
import { protectRoute, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Auth routes
router.post("/register", Register);
router.post("/login", login);
router.post("/logout", logout);

// Route to get currently logged-in user
router.get("/me", protectRoute, (req, res)=>{
    res.status(200).json({ success: true, user: req.user});
})

// Admin-only route
router.get("/admin", protectRoute, verifyAdmin, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
