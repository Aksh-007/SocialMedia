import express from "express";
import { createPost, deletePost, getAllPost, getPostById, getUserPost, postComment } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js"
const postRouter = express.Router();

postRouter.post("/createPost/:userId", upload.single("file"), createPost);

postRouter.get("/getAllPost", getAllPost);
postRouter.get("/getPost/:postId", getPostById);
postRouter.delete("/deletePost/:userId/:postId", deletePost);
postRouter.get("/getuserPost/:userId", getUserPost);
postRouter.post("/postComment/:userId/:postId", postComment)

export default postRouter;