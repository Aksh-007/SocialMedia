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

