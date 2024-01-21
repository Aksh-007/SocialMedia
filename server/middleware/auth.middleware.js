import asyncHandler from "../utility/asyncHandler.js";
import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import userSchema from "../models/user.schema.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {

    let token;
    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }
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
        if (!req.user) {
            res.status(404).json({
                success: false,
                message: "No Such User Exists!",
            });
            return;
        }
        next()
    } catch (error) {
        console.log("error in catch", error)
        res.status(401).json({
            error: error,
            success: false,
            message: "Not authorized to access this route",
        });
    }

})

export default isLoggedIn;