import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"


/******************************************************
 * @GET_VERIFYEMAIL
 * @route http://localhost:5000/api/v1/user/verify/:token
 * @description Verify the email
 * @parameters email , token  
 * @returns Verified User
 ******************************************************/
export const verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { token } = req.params

    // console.log("Email verification token", token)
    const userExists = await userSchema.findOne({ email });

    if (!userExists) throw new Error('No such User Exist please register')

    const isVerifyTokenMatch = await userExists.compareVerifyToken(token)

    if (!isVerifyTokenMatch) throw new Error('Invalid Verification Token')

    // if token match change isVerified:true ad save
    userExists.isVerified = true
    // set it to empty 
    userExists.emailVerificationToken = ""
    await userExists.save();

    res.status(200).json({
        success: true,
        message: 'Email Verified Succesfully',
        userExists
    })


})