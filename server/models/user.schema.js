import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is Required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name is Required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },
        passwords: {
            type: String,
            required: [true, "Passwords is Required"],
            minLength: [6, "Password should be atleast 6 digit"],
            select: false,
        },
        location: { type: String },
        profileUrl: { type: String },
        profession: { type: String },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        views: [
            { type: String }
        ],
        verified: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)


export default mongoose.model("User", userSchema)