
import express from 'express';
import { login, register } from '../controllers/authController.js';
import verifiedEmail from "../middleware/verifyEmail.middleware.js"
const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", verifiedEmail, login)



export default authRoutes;