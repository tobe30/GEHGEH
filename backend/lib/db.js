import mongoose from "mongoose";

export const connDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL) ///main connection
        console.log(`MongDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
        process.exit(1);
    }
}
