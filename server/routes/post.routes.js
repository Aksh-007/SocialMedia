import express from "express";
import { createPost, deleteComment, deletePost, getAllPost, getPostById, getUserPost, likeComment, likePost, postComment, replyComment, unlikeComment, unlikedPost, updateComment } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js"
const postRouter = express.Router();

postRouter.post("/createPost/:userId", upload.single("file"), createPost);
postRouter.get("/getAllPost", getAllPost);
postRouter.get("/getPostbyId/:postId", getPostById);
postRouter.delete("/deletePost/:userId/:postId", deletePost);
postRouter.get("/getuserPost/:userId", getUserPost);
postRouter.post("/likePost/:userId/:postId", likePost);
postRouter.post("/unlikePost/:userId/:postId", unlikedPost)

postRouter.post("/postComment/:userId/:postId", postComment)
postRouter.delete("/deleteComment/:userId/:commentId", deleteComment);
postRouter.post("/likeComment/:userId/:commentId", likeComment);
postRouter.post("/unlikeComment/:userId/:commentId", unlikeComment);
postRouter.post("/updateComment/:userId/:commentId", updateComment)
postRouter.post("/replyComment/:userId/:commentId", replyComment);

export default postRouter;