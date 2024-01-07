import asyncHandler from "./asyncHandler.js";
import crypto from "crypto"


const randomStringGenerator = (() => {
    try {
        return crypto.randomBytes(20).toString('hex');
    } catch (error) {
        console.log(error);
        throw new Error("Error while generating random string")
    }
})

export default randomStringGenerator;