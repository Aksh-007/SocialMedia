import express from "express";
import { createPost, getAllPost } from "../controllers/postController.js";
import { upload } from "../middleware/multer.middleware.js"
const postRouter = express.Router();

postRouter.post("/createPost/:userId", upload.single("file"), createPost);

postRouter.get("/getAllPost", getAllPost);

export default postRouter;