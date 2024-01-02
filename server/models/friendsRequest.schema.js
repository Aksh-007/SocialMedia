import mongoose, { Schema } from "mongoose"

const friendRequestSchema = new mongoose.Schema(
    {
        requestTo: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        requestFrom: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        requestStatus: {
            type: String,
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
)


export default mongoose.model("FriendRequest", friendRequestSchema)