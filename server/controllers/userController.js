import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import randomStringGenerator from "../utility/randomStringGenerator.js"


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




/******************************************************
 * @GET_PASSWORD_RESET
 * @route http://localhost:5000/api/v1/user/forgot-password
 * @description Verify the email,
 * @parameters email  
 * @returns sucess message email sent
 ******************************************************/

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const userExists = await userSchema.findOne({ email })
    if (!userExists) throw new Error("No User Exist please Signup")
    const resetToken = randomStringGenerator();
    console.log("Password Reset Token", resetToken)
    userExists.forgotPasswordToken = resetToken;
    // {validateBeforeSave: false} because of validation error
    await userExists.save({ validateBeforeSave: false });

    // setting forgotPasswordToken to undefined before sending response back
    userExists.forgotPasswordToken = undefined
    // sent 
    res.status(200).json({
        success: true,
        message: `Password Reset Token sent to:${userExists.email}`,
        userExists,
    })
})