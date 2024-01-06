import asyncHandler from "../utility/asyncHandler.js";
import userSchema from "../models/user.schema.js";

export const verifiedEmail = asyncHandler(async (req, res, next) => {
    
    //  here first check is user isVrified 
    const { email } = req.body
    console.log("verify email", email)
    const userExists = await userSchema.findOne({ email })
    if (!userExists) throw new Error("User does not exist please register")

    if (userExists.isVerified === false) throw new Error("Please Verify the user")

    next()
})

export default verifiedEmail;