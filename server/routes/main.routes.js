import express from "express"
import authRoutes from "./auth.routes.js"
import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";
import authMiddleware from "../middleware/auth.middleware.js"
const router = express.Router();

router.use("/auth", authRoutes)
router.use("/user", userRouter)
router.use("/post", authMiddleware, postRouter);

// home route for testing



export default router