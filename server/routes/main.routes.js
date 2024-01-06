import express from "express"
import authRoutes from "./auth.routes.js"
import userRouter from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/user", userRouter)
// home route for testing
router.get("/", (req, res) => {
    res.send(`<h1>App is Running</h1>`)
})


export default router