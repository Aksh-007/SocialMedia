import express from "express"
import { forgotPassword, verifyEmail, resetPassword, changePassword, getUserById, updateUser, suggestFriends, sentfriendRequest, getAllFriendRequest, acceptFriendRequest } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const userRouter = express.Router()

userRouter.get("/verifyEmail/:userId/:token", verifyEmail)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:userId/:resetToken", authMiddleware, resetPassword)
userRouter.post("/change-password/:userId", authMiddleware, changePassword);
userRouter.get("/getUserById/:currentUserId/:userId", authMiddleware, getUserById)
userRouter.put("/updateUser/:userId", authMiddleware, updateUser);
userRouter.get("/friends-suggestion/:userId", authMiddleware, suggestFriends)
userRouter.post("/friendRequest/:userId/:requestedUserId", authMiddleware, sentfriendRequest);
userRouter.get("/friendRequest/:userId", authMiddleware, getAllFriendRequest);
userRouter.post("/acceptFriendRequest/:userId/:requestedId", authMiddleware, acceptFriendRequest);

export default userRouter