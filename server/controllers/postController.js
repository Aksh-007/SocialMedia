import postSchema from "../models/post.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
/******************************************************
 * @POST_CREATE_POST
 * @route http://localhost:5000/api/v1/post/createPost
 * @description create the post for user
 * @parameters descrption ,image and userID
 * @returns created post for user
 ******************************************************/
export const createPost = asyncHandler(async (req, res) => {
    
})