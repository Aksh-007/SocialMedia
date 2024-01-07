import express from "express"
import { forgotPassword, verifyEmail } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/verify/:token", verifyEmail)
userRouter.post("/forgot-password", forgotPassword)


export default userRouter