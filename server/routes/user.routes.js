import express from "express"
import { forgotPassword, verifyEmail, resetPassword } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/verifyEmail/:userId/:token", verifyEmail)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:userId/:resetToken", resetPassword)


export default userRouter