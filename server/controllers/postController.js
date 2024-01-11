import postSchema from "../models/post.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import CustomError from "../utility/customError.js"
import cloudinary from "../utility/imageHelper.js"
import fs from 'fs';


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
    const imageUrl = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "post", resource_type: "image" },
    );
    console.log("imageUrl secure_url =", imageUrl.secure_url)
    // Delete the uploaded file from the local storage (upload folder)
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File deleted successfully!');
        }
    });
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

