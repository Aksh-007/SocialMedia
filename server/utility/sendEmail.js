import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid"
import asyncHandler from "./asyncHandler.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
})

export const sendVerificationEmail = asyncHandler(async (user, res) => {
    const { _id, email, lastName } = user;
    const token = _id + uuidv4()
    const link = `${APP_URL}users/verify/${_id}/${token}`

    // mail options
    const mailOptions = {
        from:AUTH_EMAIL,
        to:email,
        subject:"Email Verification",
        html:`
        
        `
    }
})