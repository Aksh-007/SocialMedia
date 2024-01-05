import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import crypto from "crypto"
import hashedToken from "../utility/hashToken.js"


/******************************************************
 * @POST_REGISTER
 * @route http://localhost:5000/api/v1/auth/register
 * @description Register the user 
 * @parameters firstName,lastName,email,...
 * @returns registered user
 ******************************************************/
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!(firstName || lastName || email || password)) {
        throw new Error("Please provide all the fields", 400)
    }

    const userExists = await userSchema.findOne({ email })
    if (userExists) throw new Error("User Already Exists Please Login", 400)

    //  createing a random string and set it as token 
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    console.log('email verified token ', emailVerificationToken)
    const newUser = await userSchema.create({
        firstName,
        lastName,
        email,
        password,
        emailVerificationToken
    })

    //  here dont want to share token and password 
    newUser.password = undefined
    newUser.emailVerificationToken = undefined

    res.status(200).json({
        success: true,
        message: `User Registerd successfully Verification email sent to:${newUser.email}`,
        newUser,
    })

})


