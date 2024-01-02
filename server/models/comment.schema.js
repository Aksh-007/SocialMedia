import mongoose, { Schema } from "mongoose";


const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        comment: {
            type: String,
            required: [true, "Comments is required"]
        },
        from: {
            type: String,
            required: [true, "Who commented is required"]
        },
        replies: [
            {
                rid: {
                    type: mongoose.Schema.Types.ObjectId
                },
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                from: {
                    type: String,
                },
                replyAt: {
                    type: String,
                },
                comment: {
                    type: String,
                },
                created_At: {
                    type: Date,
                    default: Date.now()
                },
                updated_At: {
                    type: Date,
                    default: Date.now()
                },
                likes: [
                    {
                        type: String
                    }
                ]
            }
        ],
        likes: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true,
    }
)


export default mongoose.model("Comment", commentSchema);