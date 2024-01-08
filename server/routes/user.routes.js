import express from "express"
import { forgotPassword, verifyEmail, resetPassword, changePassword, getUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/verifyEmail/:userId/:token", verifyEmail)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:userId/:resetToken", resetPassword)
userRouter.post("/change-password/:userId", changePassword);
userRouter.get("/getUser/:userId", getUser)


export default userRouter