import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import dotenv from 'dotenv'
import crypto from "crypto"

dotenv.config()

const { JWT_SECRET, JWT_EXPIRY } = process.env
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
        password: {
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
        },
        emailVerificationToken: String,
        emailVerificationExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    { timestamps: true }
)


// defining pre hooks to encrypt pasword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    console.log("pre password hook")
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

//  hook to encrypt emailVerificationtoken 
userSchema.pre('save', async function (next) {
    if (!this.isModified("emailVerificationToken")) return next();
    console.log("pre emailverificationhook hook")
    this.emailVerificationToken = await bcrypt.hash(this.emailVerificationToken, 10)
    next()
})
// 


userSchema.methods = {
    // method to compare password
    comparePassword: async function (enteredPassword) {
        try {
            console.log(enteredPassword)
            return await bcrypt.compare(enteredPassword, this.password)
        } catch (error) {
            console.log(error)
            throw new Error("Error in create Compare password", 400)
        }
    },

    // method to generate JWT token
    getJWTToken: async function () {
        try {
            return JWT.sign(
                {
                    _id: this._id,
                    firstName: this.firstName,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRY
                }
            )
        } catch (error) {
            console.log(error)
            throw new Error("Error in create JWT Token", 400)
        }
    },

}




export default mongoose.model("User", userSchema)