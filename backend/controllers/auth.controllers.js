import  bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { upsertStreamUser } from '../lib/stream.js';
import jwt from "jsonwebtoken";

//register function
export const Register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)){
                return res.status(400).json({ error: "Invalid email format"});
            }

        const existingUser = await User.findOne({ email });
            if(existingUser){
                return res.status(400).json({ error: "Email is already taken" })
            }
        
        if(password.length < 6){
                return res.status(400).json({ error: "Password must be at least 6 characters long" })
            }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "client",
        })

        try {
            await upsertStreamUser({
            id:newUser._id.toString(),
            name: newUser.username,
            });
            console.log(`Stream user created for ${newUser.username}`)
        } catch (error) {
            console.log("Error creating stream user", error)
        }

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent xss attacks
            secure: true, // only for https, works with ngrok
            sameSite: "none" // allows cross-site cookies
        
        })
        

        res.status(201).json({success:true, user:newUser})

        
    } catch (error) {
         console.log("Error in signup controller", error);
         res.status(500).json({ message: "Internal Server Error"});
    }
} 

//login function
export const login = async (req, res)=> {
        try {
            const {email, password} = req.body

            if(!email || !password){
                    return res.status(400).json({ message: "All fields are required"}) 
            }

            const user = await User.findOne({email})
            if(!user) return res.status(401).json({ message: "Invalid email or password"})

            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
            if(!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password"});

            const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY, {
                expiresIn: "7d",
            })

            res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent xss attacks
            secure: true, // only for https, works with ngrok
            sameSite: "none" // allows cross-site cookies
        
        })

        res.status(200).json({success: true, user});

        } catch (error) {
        console.log("Error in login controller", error.message);
         res.status(500).json({ message: "Internal Server Error"});
        }
}

//logout function
export function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,     
    sameSite: "none", 
  });
  res.status(200).json({ success: true, message: "Logout successful" });
}

