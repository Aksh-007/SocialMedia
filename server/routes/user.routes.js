import express from "express"
import { forgotPassword, verifyEmail, resetPassword, changePassword, getUser, updateUser, suggestFriends, sentfriendRequest, getAllFriendRequest, acceptFriendRequest } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/verifyEmail/:userId/:token", verifyEmail)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:userId/:resetToken", resetPassword)
userRouter.post("/change-password/:userId", changePassword);
userRouter.get("/getUser/:userId", getUser)
userRouter.put("/updateUser/:userId", updateUser);
userRouter.get("/friends-suggestion/:userId", suggestFriends)
userRouter.post("/friendRequest/:userId/:requestedUserId", sentfriendRequest);
userRouter.get("/friendRequest/:userId", getAllFriendRequest);
userRouter.post("/acceptFriendRequest/:userId/:requestedId", acceptFriendRequest);

export default userRouter