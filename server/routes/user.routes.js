import express from "express"
import { verifyEmail } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/verify/:token", verifyEmail)


export default userRouter