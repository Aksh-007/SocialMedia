import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
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
        }
    },
    { timestamps: true }
)


// defining pre hooks to encrypt pasword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, dotenv.BCRYPT_SALT_VALUE)
    next();
})


userSchema.method = {
    // method to compare password
    comparePassword: async function (enteredPassword) {
        try {
            return await bcrypt.compare(enteredPassword, this.password)
        } catch (error) {
            console.log(error)
            throw new Error("Error in create JWT Token", 400)
        }
    },

    // method to generate JWT token
    getJWTToken: function () {
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
    }



}


export default mongoose.model("User", userSchema)