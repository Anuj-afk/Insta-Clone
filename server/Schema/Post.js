import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({

    post_id: {
        type: String,
        required: true,
        unique: true
    },
    des: {
        type: String,
        maxlenght: 2200,
        required: true
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0,
        },
        total_comments: {
            type: Number,
            default: 0
        },
        total_views: {
            type: Number,
            default: 0,
        }
    },
    likes_hide: {
        type: Boolean,
        default: false
    },
    comment_hide: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
        default: "",
        required: true,
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

})

export default mongoose.model("posts", postSchema);