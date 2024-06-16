import Farmer from '../models/farmer.models.js';
import Post from '../models/post.models.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        const { description, isPublic, imageUrl } = req.body
        const farmer = req.farmer;
        const post = await Post.create({
            content: description,
            file: imageUrl,
            createdBy: farmer._id,
            isPublic
        });

        console.log("Post created successfully")
        console.log(post);
        res.status(201).send({ post: "Post created successfully", postid: post._id.toString() });
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}

// Get all feeds
const getFeeds = async (req, res) => {
    try {

        let allPosts = [];

        // public posts
        const pubPosts = await Post.find({ isPublic: true });


        // Fetch current farmer's posts
        const publicPostsPromises = pubPosts.map(async (postId) => {
            let post = await Post.findById(postId);
            return post;
        });

        const farmer = req.farmer;

        if (!farmer) {
            let publicPosts = [];
            Promise.all(publicPostsPromises)
                .then((postObjArrays) => {
                    publicPosts = [...publicPosts, ...postObjArrays];
                    return res.status(201).send(publicPosts);
                })
        }
        else {

            const following = farmer.following;
            const currentFarmerPosts = farmer.posts;

            // Fetch current farmer's posts
            const currentPostsPromises = currentFarmerPosts.map(async (postId) => {
                let post = await Post.findById(postId);
                return post;
            });

            // Fetch posts from following farmers
            const followingPostsPromises = following.map(async (farmerId) => {
                let farmer = await Farmer.findById(farmerId).select("posts");
                const posts = farmer.posts;
                const postPromises = posts.map(async (postId) => {
                    let post = await Post.findById(postId);
                    return post;
                });
                return Promise.all(postPromises);
            });

            // Combine all promises
            Promise.all([Promise.all(currentPostsPromises), Promise.all(publicPostsPromises), ...followingPostsPromises])
                .then((results) => {
                    // Flatten the array of arrays
                    results.forEach((postArray) => {
                        allPosts = [...allPosts, ...postArray];
                    });



                    // Remove duplicates
                    const uniquePosts = Array.from(new Set(allPosts.map(post => post._id.toString())))
                        .map(id => {
                            return allPosts.find(post => post._id.toString() === id);
                        });

                    return res.status(201).send(uniquePosts);


                })
        }


    } catch (error) {
        res.status(502).send(error.message);
    }
}

// Get current farmer posts
const getCurrentFarmerPosts = async (req, res) => {
    try {
        const farmer = req.farmer;
        const currentFarmerPosts = farmer.posts;

        let currentPosts = [];

        // Fetch current farmer's posts
        const currentPostsPromises = currentFarmerPosts.map(async (postId) => {
            let post = await Post.findById(postId);
            return post;
        });

        Promise.all(currentPostsPromises)
            .then((postObjArrays) => {
                currentPosts = [...currentPosts, ...postObjArrays];
                return res.status(201).send(currentPosts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                return res.status(500).send('Internal Server Error');
            });

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

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
        else {
            const farmer = req.farmer;
            if (farmer) {
                const createdBy = post.createdBy;
                const following = farmer.following;
                if (following.indexOf(createdBy) !== -1) {
                    return res.status(200).send(post);
                }
            }
            else {
                return res.status(401).send({ message: 'This post is Private' })
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        let {imageUrl} = req.body;
        const farmer = req.farmer;
        const posts = farmer.posts;
        if (posts.indexOf(req.params.id) === -1) {
            return res.status(402).send({ message: "Only Posts Owner can Edit this post" });
        }
        else {
            if (!imageUrl) {
                const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!post) {
                    return res.status(404).send('Post not found');
                }
                return res.status(200).send(post);
            }
            else {
                const post = await Post.findById(req.params.id);
                if (!post) {
                    return res.status(404).send('Post not found');
                }
                let info = {
                    ...req.body,
                    profilePhoto: imageUrl
                }
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, info, { new: true, runValidators: true });
                if (!updatedPost) {
                    return res.status(404).send('Post not found');
                }
                return res.status(200).send(post);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

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
            let likes = post.likes;
            likes.push(farmer._id);
            const updatedPost = await Post.updateOne(
                { _id: post._id },
                { $set: { likes: likes } }
            )
        }
        res.status(200).send('Post is liked');
    } catch (error) {
        res.status(500).send(error);
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
            let likes = post.likes;
            likes = likes.filter(item => item !== farmer._id);
            const updatedPost = await Post.updateOne(
                { _id: post._id },
                { $set: { likes: likes } }
            )
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

            const comment = comments.filter(item => item._id === req.params.commentId)

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

        let saved = farmer.saved;
        saved.push(req.params.id);

        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { saved: saved } }
        )
        res.status(200).send('Post is saved');
    } catch (error) {
        res.status(500).send(error);
    }
}

// unsave post
const unsavePost = async (req, res) => {
    try {
        const farmer = req.farmer;

        let saved = farmer.saved;
        saved = saved.filter(item => item !== req.params.id);
        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { saved: saved } }
        )
        res.status(200).send('Post is removed from saved');
    } catch (error) {
        res.status(500).send(error);
    }
}

// get List of farmers who liked the post
const getFarmersWhoLikedPost = async (req, res) => {
    try {
        const post = Post.findById(req.params.id);
        const likes = post.likes;

        let farmersWhoLikedPost = [];

        const farmersLikedPromises = likes.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId);
            return farmer;
        });

        Promise.all(farmersLikedPromises)
            .then((farmerObjArrays) => {
                farmersWhoLikedPost = [...farmersWhoLikedPost, ...farmerObjArrays];
                return res.status(201).send(farmersWhoLikedPost);
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
                return res.status(500).send('Internal Server Error');
            });

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