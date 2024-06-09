import Post from '../models/post.models.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

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
        const posts = await Post.find();
        res.status(200).send(farmers);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a farmer by ID
const getFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send(farmer);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a farmer by ID
const updateFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send(farmer);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a farmer by ID
const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send('Farmer deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    createFarmer,
    loginFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer,
    logoutFarmer
}