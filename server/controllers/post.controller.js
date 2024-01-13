import postSchema from "../models/post.schema.js"
import commentSchema from "../models/comment.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import CustomError from "../utility/customError.js"
import uploadImage from "../utility/imageUpload.js"



/******************************************************
 * @POST_CREATE_POST
 * @route http://localhost:5000/api/v1/post/createPost/userId
 * @description create the post for user
 * @parameters descrption ,image and userID
 * @returns created post for user
 ******************************************************/
export const createPost = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { description } = req.body;

    if (!description) throw new CustomError("Please Provide description", 400);
    const post = { userId, description };

    if (req.file && req.file.path) {
        // uploading image in cloudinary
        const imageUrl = await uploadImage(req.file.path);
        post.image = imageUrl.secure_url
    }

    const newPost = await postSchema.create(post)

    res.status(200).json({
        success: true,
        message: `Post Created Succesfully`,
        newPost
    })

})

/******************************************************
 * @GET_ALL_POST
 * @route http://localhost:5000/api/v1/post/getAllPost
 * @description it will give recent 10 post
 * @parameters 
 * @returns 10 recent post
 ******************************************************/
export const getAllPost = asyncHandler(async (req, res) => {

    // here sort function giving descending to ascending post
    // i.e recent post first 
    const allPost = await postSchema.find().sort({ _id: -1 }).limit(10)

    res.status(200).json({
        success: true,
        message: "Post Retrieved",
        allPost
    })
})

/******************************************************
 * @GET_POST
 * @route http://localhost:5000/api/v1/post/getPost/:postId
 * @description it will give post 
 * @parameters postId
 * @returns  post realeted to postId
 ******************************************************/
export const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) throw new CustomError("Post Id Is Required");

    const post = await postSchema
        .findById(postId)
        .populate("userId", "firstName lastName email location profileUrl profession")
        .populate({
            path: "comments",
            populate: {
                path: "userId",
                select: "firstName lastName email location profileUrl profession"
            }
        })

    if (!post) throw new CustomError("No such Post Exist!");

    res.status(200).json({
        success: true,
        message: "Post Retrived Succesfully",
        post
    })
})

/******************************************************
 * @DELETE_POST
 * @route http://localhost:5000/api/v1/post/deletePost/:userId/:postId
 * @description the specific user can delete the post  
 * @parameters userID andpostId
 * @returns  delete post 
 ******************************************************/
export const deletePost = asyncHandler(async (req, res) => {
    const { userId, postId } = req.params;
    const postExist = await postSchema.findById(postId);

    if (!postExist) throw new CustomError("No such post Exist!", 404);

    console.log("Post details -", postExist)
    if (postExist.userId.toString() !== userId) throw new CustomError("Not Authorize to delete", 401)

    await postSchema.findByIdAndDelete(postId);

    res.status(200).json({
        success: true,
        message: "Post deleted successfully!"
    })
})

/******************************************************
 * @GET_USER_POST
 * @route http://localhost:5000/api/v1/post/getuserPost/:userId
 * @description it will give 10 recent post of User 
 * @parameters userId
 * @returns  10 recent post of user
 ******************************************************/
export const getUserPost = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) throw new CustomError("Please Provide User Id!", 404);

    const userPosts = await postSchema.find({ userId }).sort({ _id: -1 }).limit(10);

    if (userPosts.length === 0) throw new CustomError("No Post Added by User", 200)

    res.status(200).json({
        success: true,
        message: "All User Post",
        userPosts
    })
})

/******************************************************
 * @POST_COMMENT
 * @route http://localhost:5000/api/v1/post/postComment/:userId/:postId
 * @description it will give 10 recent post of User 
 * @parameters userId
 * @returns  10 recent post of user
 ******************************************************/
export const postComment = asyncHandler(async (req, res) => {
    const { userId, postId } = req.params
    const { comment } = req.body

    if (!comment) throw new CustomError("Comment is required", 400);

    // finding post 
    const existingPost = await postSchema.findById(postId);
    if (!existingPost) throw new CustomError("No such Post Exist")

    const newComment = await commentSchema.create({
        userId,
        postId,
        comment
    })

    // push comment into post schema
    existingPost.comments.push(newComment._id);
    await existingPost.save();

    res.status(200).json({
        success: true,
        message: "Comment Added successfully",
        newComment
    })
})

/******************************************************
 * @POST_LIKE_COMMENT
 * @route http://localhost:5000/api/v1/post/likeComment/:userId/:commentId
 * @description it will like the comments 
 * @parameters userId and commentID
 * @returns  comment like
 ******************************************************/
export const likeComment = asyncHandler(async (req, res) => {
    const { userId, commentId } = req.params
    if (!(userId || commentId)) throw new CustomError("Please pass comment and post Id", 400)



    const commentExist = await commentSchema.findById(commentId)
    // .populate({
    //     path: "userId",
    //     select: "firstName lastName email location profileUrl profession"
    // })
    // .populate({
    //         path: "postId",
    //         select: "image descrption createdAt updatedAt likes comments"
    //     });

    if (!commentExist) throw new CustomError("No Comment Exists", 404);

    // handling if already like the comment 
    if (!commentExist.likes.map(id => id === userId)) {
        commentExist.likes.push(userId);
    }
    await commentExist.save();

    res.status(200).json({
        success: true,
        message: "Comment Liked",
        commentExist
    })
})


