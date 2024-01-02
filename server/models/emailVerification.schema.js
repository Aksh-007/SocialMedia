import mongoose, { Schema } from "mongoose";


const emailVerificationSchema = new mongoose.Schema(
    {
        userId: String,
        token: String,
        created_At: Date,
        expires_At: Date,

    }
)

export default mongoose.model("EmailVerification", emailVerificationSchema)
