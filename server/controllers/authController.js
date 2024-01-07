import userSchema from "../models/user.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import crypto from "crypto"


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
    const emailVerificationTokenPlain = crypto.randomBytes(20).toString('hex');
    const newUser = await userSchema.create({
        firstName,
        lastName,
        email,
        password,
        emailVerificationToken: emailVerificationTokenPlain,
    })

    // creating a url to sent to email to verify email 
    const verifyUrl =
        `${req.protocol}://${req.get("host")}/api/v1/user/verifyEmail/${newUser._id}/${emailVerificationTokenPlain}`
    //  here dont want to share token and password 
    newUser.password = undefined
    newUser.emailVerificationToken = undefined


    res.status(200).json({
        success: true,
        message: `User Registerd successfully Verification email sent to:${newUser.email}`,
        newUser,
        verifyUrl,
    })

    // const verifyUrl =
    //     `${req.protocol}://${req.get("host")}/api/auth/password/verify/${emailVerificationToken}`
    // console.log("verifyUrl is", verifyUrl)
    // const html = `<div>
    // style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    // <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
    // <hr>
    // <h4>Hi ${firstName}${lastName},</h4>
    // <p>
    //     Please verify your email address so we can know that it's really you.
    //     <br>
    // <p>This link <b>expires in 1 hour</b></p>
    // <br>
    // <a href=${verifyUrl}
    //     style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify
    //     Email Address</a>
    // </p>
    // <div style="margin-top: 20px;">
    //     <h5>Best Regards</h5>
    //     <h5>ShareFun Team</h5>
    // </div>
    //             </div>`

    // sending token to mail
    // try {
    //     await mailHelper({
    //         email: newUser.email,
    //         subject: "Password reset email for website",
    //         html: html,
    //     })
    //     res.status(200).json({
    //         success: true,
    //         message: `Email send to ${newUser.email}`
    //     })
    // } catch (err) {
    //     //roll back - clear fields and save
    //     userSchema.emailVerificationToken = undefined
    //     await userSchema.save({ validateBeforeSave: false })
    //     throw new Error(err.message || 'Email sent failure', 500)
    // }

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
    if (!email) throw new Error('Please Fill Email Field');
    if (!password) throw new Error('Please Fill password Field');

    // here please select password otherwise no password selected
    const userExist = await userSchema.findOne({ email }).select("+password")

    if (!userExist) throw new Error('Please Register User')

    if (userExist.verified === false) throw new Error("please Verify Email")

    const isPasswordMatch = await userExist.comparePassword(password)

    if (!isPasswordMatch) throw new Error("Invalid Password")
    // cookies options
    const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true, // Cookie will only be sent over HTTPS
        // domain: 'example.com', // Cookie is valid for the entire domain
        // path: '/', // Cookie is valid for all URLs under the domain
    }
    if (isPasswordMatch) {
        const token = await userExist.getJWTToken()
        userExist.password = undefined
        res.cookie('token', token, cookieOptions)
        return res.status(200).json({
            success: true,
            message: "Login Sucesfully",
            token,
            userExist
        })
    }

})