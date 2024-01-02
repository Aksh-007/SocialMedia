import mongoose from "mongoose";


const passwordResetSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        token: String,
        created_At: Date,
        expires_At: Date,
    }
)

export default mongoose.model("PasswordReset", passwordResetSchema);

