import Farmer from '../models/farmer.models.js';
import Post from '../models/post.models.js';
import { getFarmer } from './farmer.controller.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        const { content, image, farmerId, isPublic} = req.body
        if(!farmerId) res.status(401).send("All fields require")
        const post = await Post.create({
            content,
            image,// use cloudinary
            createdBy:farmerId,
            isPublic
        });

        res.status(201).send({
            post:"Post created successfully",
            postid:post._id.toString()
        });
        console.log("Post created successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}


// Get all posts
const getPosts = async (req, res) => {
    try {
        const { viewerId, farmerId} = req.body;
        const farmer = await Farmer.findById(farmerId);
        const followers = farmer.followers;
        let posts = farmer.posts;
        if(followers.indexOf(viewerId) !== -1){
            console.log("Posts follower")
            res.status(200).send(posts);
        }
        else{
            // posts cannot filtering as per public or not
            console.log("Posts")
            let publicPosts = posts.filter(async (postId) =>{
                const post = await Post.findById(postId)
                const val = post.isPublic;
                return val;
            });
            res.status(200).send(publicPosts)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a post by ID
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        if(post.isPublic){
            res.status(200).send(post);
        }
        else{
            const {viewerId, farmerId} = req.body;
            const farmer = await Farmer.findById(farmerId);
            const followers = farmer.followers;
            if(followers.indexOf(viewerId) !== -1){
                return res.status(200).send(post);
            }
            res.status(401).send({message : 'This post is Private'})
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a farmer by ID
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).send('Post deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}