import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import CustomError from "./customError.js"
import fs from 'fs';

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    try {
        if (!filePath) throw new CustomError("File Path Name is Required");

        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(filePath);
        return uploadResponse;

    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
}


export default uploadImage;