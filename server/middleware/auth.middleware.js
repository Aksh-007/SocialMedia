import asyncHandler from "../utility/asyncHandler.js";
import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import userSchema from "../models/user.schema.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {


    //  here first check is user isVrified 
    const { email } = req.body

    const userExists = await userSchema.findOne({ email })
    if (!userExists) throw new Error("User does not exist please register")

    if (userExists.isVerified === false) throw new Error("Please Verify the user")

    let token;

    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }
    console.log(token)
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
        return;
    }

    try {
        const decodeJWTPayload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = await userSchema.findById(decodeJWTPayload._id)
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }

})

export default isLoggedIn;