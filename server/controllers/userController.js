import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import randomStringGenerator from "../utility/randomStringGenerator.js"


/******************************************************
 * @GET_VERIFYEMAIL
 * @route http://localhost:5000/api/v1/user/verifyEmail/:userId/:token
 * @description Verify the userId
 * @parameters userId , token  
 * @returns Verified User
 ******************************************************/
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token, userId } = req.params

    const userExists = await userSchema.findById(userId)

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
    userExists.forgotPasswordToken = resetToken;
    // {validateBeforeSave: false} because of validation error
    await userExists.save({ validateBeforeSave: false });

    // setting forgotPasswordToken to undefined before sending response back
    userExists.forgotPasswordToken = undefined
    // creating url to sent on mail
    // http://localhost:5000/api/v1/user/reset-password/:userId/:resetToken
    const forgotPasswordUrl =
        `${req.protocol}://${req.get("host")}/api/v1/user/reset-password/${userExists._id}/${resetToken}`

    res.status(200).json({
        success: true,
        message: `Password Reset Token sent to:${userExists.email}`,
        userExists,
        forgotPasswordUrl
    })
})


/******************************************************
 * @POST_PASSWORD_RESET
 * @route http://localhost:5000/api/v1/user/reset-password/:userId/:resetToken
 * @description Verify the email,
 * @parameters email , confirmPassword 
 * @returns sucess message email sent
 ******************************************************/
export const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, userId } = req.params;
    const { password, confirmPassword } = req.body

    if (password !== confirmPassword) throw new Error("Password and confirm password not Match")

    const userExists = await userSchema.findById(userId);

    const isPasswordResetTokenMatch = await userExists.comparePasswordResetToken(resetToken);


    if (!isPasswordResetTokenMatch) throw new Error("Invalid Password Reset Link")

    userExists.password = password;
    userExists.forgotPasswordToken = "";
    await userExists.save({ validateBeforeSave: false })

    userExists.password = ""

    res.status(200).json({
        success: true,
        message: "Password Reset Sucesfully",
        userExists,
    })
})