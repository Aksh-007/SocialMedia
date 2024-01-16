import express from "express"
import authRoutes from "./auth.routes.js"
import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/user", userRouter)
router.use("/post", postRouter);

// home route for testing



export default router