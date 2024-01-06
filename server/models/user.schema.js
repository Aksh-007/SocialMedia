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
        isVerified: {
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


userSchema.pre("save", async function (next) {

    try {
        // defining pre hooks to encrypt pasword
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10)

        //  hook to encrypt emailVerificationtoken 
        if (!this.isModified("emailVerificationToken")) return next();
        this.emailVerificationToken = await bcrypt.hash(this.emailVerificationToken, 10)

        // 
        next()
    } catch (error) {
        console.log(error)
        next(error);
    }
})



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

    compareVerifyToken: async function (enteredToken) {
        try {
            console.log(ente)
            return await bcrypt.compare(enteredToken, this.emailVerificationToken)
        } catch (error) {
            console.log(error);
            throw new Error("Error while comparing Verify token ")
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