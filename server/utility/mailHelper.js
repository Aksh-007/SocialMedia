import nodemailer from "nodemailer"
import dotenv, { config } from "dotenv"
dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
    // host: process.env.SMTP_MAIL_HOST,
    // port: process.env.SMTP_MAIL_PORT,
    // secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: process.env.SMTP_MAIL_USERNAME, // generated ethereal user
        pass: process.env.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
});

const mailHelper = async (options) => {

    const message = {
        from: process.env.SMTP_MAIL_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        html: options.html, // plain text body or html body
        // html: "<b>Hello world?</b>", // html body
    }
    await transporter.sendMail(message)
}

export default mailHelper;