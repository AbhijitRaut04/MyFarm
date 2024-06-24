import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    file: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }],
    comments: [{
        content: String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
