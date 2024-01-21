import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import CustomError from "../utility/customError.js"
import crypto from "crypto"
import mailHelper from "../utility/mailHelper.js"

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
        throw new CustomError("Please provide all the fields", 400)
    }

    const userExists = await userSchema.findOne({ email })
    if (userExists) throw new CustomError("User Already Exists Please Login", 400)

    //  createing a random string and set it as token 
    const emailVerificationTokenPlain = crypto.randomBytes(20).toString('hex');
    const newUser = await userSchema.create({
        firstName,
        lastName,
        email,
        password,
        emailVerificationToken: emailVerificationTokenPlain,
    })

    // creating a url to sent to email to verify email 
    // `${req.protocol}://${req.get("host")}/api/v1/user/verifyEmail/${newUser._id}/${emailVerificationTokenPlain}`
    const verifyUrl =
        `https://link-leap.vercel.app/api/v1/user/verifyEmail/${newUser._id}/${emailVerificationTokenPlain}`
    //  here dont want to share token and password 
    newUser.password = undefined
    newUser.emailVerificationToken = undefined
    const html = `<div style="font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
    <h3 style="color: #0838bc; margin-bottom: 10px;">Please verify your email address</h3>
    <hr style="border: 1px solid #ccc; margin-bottom: 20px;">
    <h4>Hi ${newUser.firstName} ${newUser.lastName},</h4>
    <p>
        Please verify your email address so we can confirm that it's really you.
        <br><br>
        <a href=${verifyUrl}
            style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px; display: inline-block;">Verify Email Address</a>
    </p>
    <div style="margin-top: 20px;">
        <h5>Best Regards,</h5>
        <h5>Linkleap Team</h5>
    </div>
</div>`;

    // sending token to mail
    try {
        await mailHelper({
            email: newUser.email,
            subject: "Password reset email for website",
            html: html,
        })
        res.status(200).json({
            success: true,
            message: `User Registerd successfully please verify email`,
            verifyUrl
        })

    } catch (err) {
        //roll back - clear fields and save
        await userSchema.findByIdAndDelete(newUser._id)

        throw new CustomError(err.message || 'Email sent failure', 500)
    }

})


/******************************************************
 * @POST_LOGIN
 * @route http://localhost:5000/api/v1/auth/login
 * @description login the user 
 * @parameters email , password 
 * @returns User Object
 ******************************************************/
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) throw new CustomError('Please Fill Email Field', 400);
    if (!password) throw new CustomError('Please Fill password Field', 400);

    // here please select password otherwise no password selected
    const userExist = await userSchema.findOne({ email }).select("+password").populate('friends', 'firstName lastName email profileUrl')

    if (!userExist) throw new CustomError('Please Register User', 404)

    if (userExist.isVerified === false) throw new CustomError("please Verify Email", 401)

    const isPasswordMatch = await userExist.comparePassword(password)

    if (!isPasswordMatch) throw new CustomError("Invalid Password", 401)
    // cookies options
    const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true, // Cookie will only be sent over HTTPS
        // domain: 'example.com', // Cookie is valid for the entire domain
        // path: '/', // Cookie is valid for all URLs under the domain
    }
    if (isPasswordMatch) {
        const token = await userExist.getJWTToken()
        userExist.password = undefined
        res.cookie('token', token, cookieOptions)
        return res.status(200).json({
            success: true,
            message: "Login Succesfully",
            token,
            user: userExist
        })
    }

})