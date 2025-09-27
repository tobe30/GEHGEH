import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(401).json({ message: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "Unauthorized - User not found"});
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

//admin middleware
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin → proceed ok am done checking move to the next step/controller
  } else {
    return res.status(403).json({ message: "Forbidden - Admins only" });
  }
};