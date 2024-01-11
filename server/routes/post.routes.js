import express from "express";
import { createPost } from "../controllers/postController.js";
import { upload } from "../middleware/multer.js";
const postRouter = express.Router();

postRouter.post("/createPost/:userId", upload.single("file"), createPost)

export default postRouter;