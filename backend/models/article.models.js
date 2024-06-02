import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
