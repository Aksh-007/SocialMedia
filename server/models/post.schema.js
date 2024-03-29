
import mongoose, { Schema } from "mongoose";


const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        description: {
            type: String,
            required: [true, "description is required"],
            trim: true
        },
        image: {
            type: String,
        },
        likes: [
            { type: String }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "comments"
            }
        ],
    },
    { timestamps: true }
)

export default mongoose.model("Post", postSchema);