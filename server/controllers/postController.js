import postSchema from "../models/post.schema.js"
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
    const image = req.file;

    if (!description) throw new CustomError("Please Provide description", 400);

    // uploading image in cloudinary
    const imageUrl = await uploadImage(req.file.path);
    const newPost = await postSchema.create({
        userId,
        description,
        image: imageUrl.secure_url
    })

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
export const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) throw new CustomError("Post Id Is Required");

    const post = await postSchema.findById(postId);
    if (!post) throw new CustomError("No such Post Exist!");

    res.status(200).json({
        success: true,
        message: "Post Retrived Succesfully",
        post
    })
})



