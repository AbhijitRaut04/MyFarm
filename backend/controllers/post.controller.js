import Farmer from '../models/farmer.models.js';
import Post from '../models/post.models.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        const { heading, description, isPublic, imageUrl } = req.body
        let farmer = req.farmer;
        const post = await Post.create({
            title: heading,
            content: description,
            file: imageUrl,
            createdBy: farmer._id,
            isPublic
        });

        console.log("Post created successfully")

        //adding the created post id to farmers posts array
        await Farmer.findByIdAndUpdate(farmer._id, { $addToSet: { posts: post._id } });

        res.status(201).send({ post: "Post created successfully", postid: post._id.toString() });
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted due to post fields are not as per schema ', message: error.message });
    }
}

// Get all feeds
const getFeeds = async (req, res) => {
    try {
        let allPosts = [];

        // Fetch public posts
        let pubPosts = await Post.find({ isPublic: true });

        // Attach createdBy information to public posts
        const publicPosts = await Promise.all(pubPosts.map(async (post) => {
            post.createdBy = await Farmer.findById(post.createdBy);
            return post;
        }));

        const farmer = req.farmer;

        if (!farmer) {
            // If no farmer is logged in, return public posts
            return res.status(200).send(publicPosts);
        } else {
            const { following, posts: currentFarmerPosts } = farmer;

            // Fetch current farmer's posts
            const currentPosts = await Promise.all(currentFarmerPosts.map(async (postId) => {
                let post = await Post.findById(postId);
                post.createdBy = farmer;
                return post;
            }));

            // Fetch posts from following farmers
            const followingPosts = await Promise.all(following.map(async farmerId => {
                let followingFarmer = await Farmer.findById(farmerId).select("-password");
                const posts = await Promise.all(followingFarmer.posts.map(async (postId) => {
                    let post = await Post.findById(postId);
                    post.createdBy = followingFarmer;
                    return post;
                }));
                return posts;
            }));

            // Flatten the array of arrays
            const flattenedFollowingPosts = followingPosts.flat();

            // Combine all posts
            allPosts = [...publicPosts, ...currentPosts, ...flattenedFollowingPosts];

            // Remove duplicates
            const uniquePosts = Array.from(new Set(allPosts.map(post => post._id.toString())))
                .map(id => {
                    return allPosts.find(post => post._id.toString() === id);
                });

            return res.status(200).send(uniquePosts);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).send('Internal Server Error');
    }
}



// Get current farmer posts
const getCurrentFarmerPosts = async (req, res) => {
    try {
        const farmer = req.farmer;

        if (!farmer) {
            return res.status(400).send('Farmer not found');
        }

        const currentFarmerPosts = farmer.posts;

        // Fetch current farmer's posts
        const currentPostsPromises = currentFarmerPosts.map(postId => Post.findById(postId));

        const currentPosts = await Promise.all(currentPostsPromises);

        return res.status(200).send(currentPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).send('Internal Server Error');
    }
};


// Get a post by ID
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.isPublic) {
            return res.status(200).send(post);
        }

        const farmer = req.farmer;

        if (!farmer) {
            return res.status(401).send({ message: 'Unauthorized access to private post' });
        }

        const createdBy = post.createdBy.toString();
        const following = farmer.following.map(farmerId => farmerId.toString());

        if (following.includes(createdBy) || createdBy === farmer._id.toString()) {
            return res.status(200).send(post);
        } else {
            return res.status(403).send({ message: 'Forbidden: You do not have access to this private post' });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).send('Internal Server Error');
    }
};


// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const farmer = req.farmer;

        if (!farmer) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        const posts = farmer.posts.map(postId => postId.toString());

        if (!posts.includes(req.params.id)) {
            return res.status(403).send({ message: "Only the post owner can edit this post" });
        }

        let updateData = { ...req.body };

        if (imageUrl) {
            updateData.profilePhoto = imageUrl;
        }

        const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        return res.status(200).send(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).send('Internal Server Error');
    }
};


// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const farmer = req.farmer;
        const posts = farmer.posts;
        if (posts.indexOf(req.params.id) === -1) {
            return res.status(402).send({ message: "Only Posts Owner can Delete this post" });
        }
        else {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            res.status(200).send('Post deleted');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// like a post
const likePost = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let likesArray = post.likes;
            if (likesArray.includes(farmer._id)) return res.status(409).send("You already liked the post");

            await Post.updateOne(
                { _id: post._id },
                { $addToSet: { likes: farmer._id } }
            )
            console.log("checking the post");
            try {
                const post = await Post.findById(req.params.id);
                console.log(post);
            } catch (error) {
                console.error("Error fetching post:", error);
                // Respond with a server error message or handle it accordingly
            }
        }
        res.status(200).send('Post is liked');
    } catch (error) {
        res.status(500).send("Error liking post(at likepost function):", error);
    }
}

// unlike a post
const unlikePost = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let likesArray = post.likes;
            if (!(likesArray.includes(farmer._id))) return res.status(409).send("You didn't like the post yet!");

            await Post.updateOne(
                { _id: post._id },
                { $pull: { likes: farmer._id } }
            );
        }
        res.status(200).send('Post is unliked');
    } catch (error) {
        res.status(500).send(error);
    }
}

// comment on post
const comment = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let comments = post.comments;
            let newComment = {
                content: req.body.content,
                createdBy: farmer._id
            }
            comments.push(newComment);
            const updatedPost = await Post.updateOne(
                { _id: post._id },
                { $set: { comments: comments } }
            )
        }
        res.status(200).send('Comment is added to post');
    } catch (error) {
        res.status(500).send(error);
    }
}


// delete comment on post
const deleteComment = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let comments = post.comments;

            const comment = comments.filter(item => item._id === req.params.commentId)[0]

            if (comment.createdBy === farmer._id) {
                comments = comments.filter(item => item !== req.params.commentId);
                const updatedPost = await Post.updateOne(
                    { _id: post._id },
                    { $set: { comments: comments } }
                )
                return res.status(201).send("Post deleted successfully");
            }
            else {
                res.status(500).send("You cannot delete this comment")
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// edit comment on post
const editComment = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let comments = post.comments;
            comments = comments.filter(item => item !== req.params.commentId);
            let newComment = {
                content: req.body.content,
                createdBy: farmer._id
            }
            comments.push(newComment);
            const updatedPost = await Post.updateOne(
                { _id: post._id },
                { $set: { comments: comments } }
            )
        }
        res.status(200).send('Comment is edited to post');
    } catch (error) {
        res.status(500).send(error);
    }
}

// save post
const savePost = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let savedArray = farmer.saved;
            if (savedArray.includes(post._id)) return res.status(409).send("You already saved the post");

            await Farmer.updateOne(
                { _id: farmer._id },
                { $addToSet: { saved: post._id } }
            )
        }
        res.status(200).send('Post is saved');
    } catch (error) {
        res.status(500).send("Error saving post(at savePost function):", error);
    }
}

// unsave post
const unsavePost = async (req, res) => {
    try {
        const farmer = req.farmer;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        else {
            let savedArray = farmer.saved;
            if (!(savedArray.includes(post._id))) return res.status(409).send("You didn't saved the post yet!");

            await Farmer.updateOne(
                { _id: farmer._id },
                { $pull: { saved: post._id } }
            );
        }
        res.status(200).send('Post is unsaved');
    } catch (error) {
        res.status(500).send("Error unsaving post(at unsavePost function):", error);
    }
}
// get List of farmers who liked the post
const getFarmersWhoLikedPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const farmersWhoLikedPost = await Promise.all(post.likes.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId).select("-password");
            return farmer;
        }))

        return res.status(201).send(farmersWhoLikedPost);

    } catch (error) {
        res.status(501).send({ message: error.message })
    }
}

// get comments on posts
const getComments = async (req, res) => {
    try {
        const post = Post.findById(req.params.id);
        const comments = post.comments;

        return res.status(201).send(comments);

    } catch (error) {
        res.status(501).send({ message: error.message })
    }
}




export {
    createPost,
    getFeeds,
    getCurrentFarmerPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    comment,
    deleteComment,
    editComment,
    savePost,
    unsavePost,
    getFarmersWhoLikedPost,
    getComments
}