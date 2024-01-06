
import express from 'express';
import { login, register } from '../controllers/authController.js';
import authMiddleware from "../middleware/auth.middleware.js"
const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", authMiddleware, login)



export default authRoutes;