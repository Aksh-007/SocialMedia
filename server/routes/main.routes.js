import express from "express"
import authRoutes from "./auth.routes.js"

const router = express.Router();

router.use('/auth', authRoutes)

// home route for testing
router.get("/", (req, res) => {
    res.send(`<h1>App is Running</h1>`)
})


export default router