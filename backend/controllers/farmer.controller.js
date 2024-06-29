import { generateJWTToken } from '../db/generateToken.js';
import { encryptData, comparePasswords } from '../db/hashPassword.js';
import Farmer from '../models/farmer.models.js';
import Message from '../models/message.models.js';
import Post from '../models/post.models.js';

// Create a new farmer
const createFarmer = async (req, res) => {
    try {
        let { username, email, password, age, location, imageUrl } = req.body;
        const hash_pass = await encryptData(password);
        password = hash_pass;
        let info = {
            username,
            email,
            password,
            age,
            location,
            profilePhoto: imageUrl
        }
        const farmer = await Farmer.create(info);

        console.log("Farmer registered successfully, logging in");
        const token = generateJWTToken(farmer);

        res.cookie("token", token)
        res.status(201).send({
            farmer: "Farmer registered successfully",
            userId: farmer._id.toString()
        });
        console.log("Log in successful");
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}

// login farmer
const loginFarmer = async (req, res) => {
    try {
        const data = req.body;
        const farmer = await Farmer.findOne({ email: data.email });
        if (!farmer) {
            console.log("Farmer does not exists")
            res.status(401).send({ message: "Farmer not registered yet!" })
        }
        else {
            if (!(await comparePasswords(data.password, farmer.password))) return res.status(401).send({ message: "Invalid credentials" });
            else {
                console.log("Farmer Logged in")
                const token = generateJWTToken(farmer);

                res.cookie("token", token)
                res.status(201).send({ token: token });
            }
        }
    }
    catch (error) {
        res.status(500).send({ message: "Invalid credentials" });
    }
}

// logout farmer
const logoutFarmer = (req, res) => {
    try {
        res.cookie("token", "")
        console.log("Farmer logout")
        res.status(201).send({ message: "Logout Successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Invalid credentials" });
    }
}


// Get all farmers
const getFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find().select("username");
        res.status(200).send(farmers);
    } catch (error) {
        res.status(500).send(error);
    }
}


// followers and following to give object form
const getFarmerProfile = async (req, res) => {
    try {

        let farmer = req.farmer;
        const posts = await Promise.all(farmer.posts.map(async (postId) => {
            const post = await Post.findById(postId);
            return post;
        }))
        farmer.posts = posts;
        return res.status(200).send(farmer);

    } catch (error) {
        console.error(`Failed to fetch farmer profile: ${error}`);
        res.status(500).send({ error: error.message });
    }
}

// const getProductsByShopkeeper = async (req, res) => {

//     try {
//         const shopkeeperId = req.params.id;

//         const products = await Product.find({ shopkeeper: shopkeeperId });
//         return res.status(200).send(products);
//     } catch (error) {
//         res.status(500).json({ message: "An error occurred while fetching the products of the shopkeeper." });
//     }

// };

// Get a farmer by ID
const getFarmer = async (req, res) => {
    try {

        let farmer = req.farmer;

        let account = await Farmer.findById(req.params.id);
        if (!account) return res.status(404).send("Farmer not found")
        const posts = await Promise.all(account.posts.map(async (postId) => {
            const post = await Post.findById(postId);
            return post;
        }))


        const followers = await Promise.all(account.followers.map(async (followerId) => {
            const follower = await Farmer.findById(followerId);
            return follower;
        }));
        const followings = await Promise.all(account.following.map(async (followingId) => {
            const following = await Farmer.findById(followingId);
            return following;
        }));
        // Filter out any null values
        account.followers = followers.filter(follower => follower !== null);
        account.following = followings.filter(following => following !== null);

        if ((farmer && account.followers.includes(farmer._id)) || farmer._id === account._id) {
            return res.status(200).send(account);
        }
        else {
            account.posts = posts.filter(post => post.isPublic === true)
            return res.status(200).send(account);
        }


    }
    catch (error) {
        res.status(500).send(error);
    }
}

// Update a farmer by ID
const updateFarmer = async (req, res) => {
    try {
        let { password, imageUrl } = req.body;

        if (!password && !imageUrl) {
            const farmer = await Farmer.findByIdAndUpdate(req.farmer._id, req.body, { new: true, runValidators: true });
            if (!farmer) {
                return res.status(404).send('Farmer not found');
            }
            return res.status(200).send(farmer);
        }
        else {
            const farmer = await Farmer.findById(req.farmer._id);
            if (!farmer) {
                return res.status(404).send('Farmer not found');
            }
            if (password) {
                const hash_pass = await encryptData(password);
                req.body.password = hash_pass;
            }
            let info = {
                ...req.body,
                profilePhoto: imageUrl
            }
            const updatedFarmer = await Farmer.findByIdAndUpdate(req.farmer._id, info, { new: true, runValidators: true });
            if (!updatedFarmer) {
                return res.status(404).send('Farmer not found');
            }
            return res.status(200).send(updatedFarmer);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a farmer
const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.farmer._id);
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.status(200).send('Farmer deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}


// get saved posts
const getSavedPosts = async (req, res) => {
    try {
        const farmer = req.farmer;

        // Fetch saved posts
        const savedPosts = await Promise.all(farmer.saved.map(async (postId) => {
            let post = await Post.findById(postId);
            return post;
        }));

        return res.status(200).send(savedPosts)
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ error: error.message });
    }
}

// follow a farmer
const followFarmer = async (req, res) => {
    try {
        const farmer = req.farmer;
        let following = farmer.following;
        following.push(req.params.id);
        if(farmer._id == req.params.id) return res.status(403).send("You cannot follow yourself");
        const updatedFarmer1 = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { following: following } }
        )
        if (!updatedFarmer1) {
            return res.status(400).send("Farmer not found")
        }
        
        const followingTo = await Farmer.findById(req.params.id);
        
        if (!followingTo) {
            return res.status(400).send("Farmer not found")
        }
        let followers = followingTo.followers;
        followers.push(farmer._id);
        const updatedFarmer2 = await Farmer.updateOne(
            { _id: req.params.id },
            { $set: { followers: followers } }
        )
        return res.status(201).send(`You are now following to ${followingTo.username}`)
        
    }
    catch (error) {
        res.status(501).send({ error: error.message })
    }
}

// unfollow a farmer
const unfollowFarmer = async (req, res) => {
    try {
        // not working
        const farmer = req.farmer;
        let following = farmer.following;
        if(farmer._id == req.params.id) return res.status(403).send("You cannot unfollow yourself");

        following = following.filter((item) => item !== req.params.id)

        const updatedFarmer1 = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { following: following } }
        )
        if (!updatedFarmer1) {
            return res.status(400).send("Farmer not found")
        }

        const followingTo = await Farmer.findById(req.params.id);

        if (!followingTo) {
            return res.status(400).send("Farmer not found")
        }
        let followers = followingTo.followers;
        followers = followers.filter((item) => item !== req.params.id)

        const updatedFarmer2 = await Farmer.updateOne(
            { _id: req.params.id },
            { $set: { followers: followers } }
        )
        return res.status(201).send(`${followingTo.username} is removed from your following accounts`)

    }
    catch (error) {
        res.status(501).send({ error: error.message })
    }
}

// get followers
const getFollowers = async (req, res) => {
    try {
        const farmer = req.farmer;
        const account = await Farmer.findById(req.params.id);
        if (!account) return res.status(400).send("Farmer not found");


        // if (account.followers.indexOf(farmer._id) === -1) {
        //     return res.status(401).send("You cannot view followers");
        // }


        // Fetch followers
        const followers = await Promise.all(account.followers.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId);
            return farmer;
        }));
        return res.status(200).send(followers);

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// get following
const getFollowing = async (req, res) => {
    try {
        const farmer = req.farmer;
        const account = await Farmer.findById(req.params.id);
        if (!account) return res.status(400).send("Farmer not found");


        // if (account.followers.indexOf(farmer._id) === -1) {
        //     return res.status(401).send("You cannot view followers");
        // }


        // Fetch following
        const following = await Promise.all(account.following.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId);
            return farmer;
        }));

        return res.status(200).send(following);

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// star message
const starMessage = async (req, res) => {
    try {
        let farmer = await Farmer.findById(req.farmer.userId);
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(400).send("Message not found");
        farmer.starredMessages.push(req.params.messageId)

        await farmer.save();
    } catch (error) {
        console.log(error);
    }
}

// unstar message
const unstarMessage = async (req, res) => {
    try {
        let farmer = await Farmer.findById(req.farmer.userId);
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(400).send("Message not found");
        farmer.starredMessages = farmer.starredMessages.filter((item) => item != req.params.messageId);

        await farmer.save();
    } catch (error) {
        console.log(error);
    }
}

export {
    createFarmer,
    loginFarmer,
    getFarmers,
    getFarmerProfile,
    getFarmer,
    updateFarmer,
    deleteFarmer,
    logoutFarmer,
    getSavedPosts,
    followFarmer,
    unfollowFarmer,
    getFollowers,
    getFollowing,
    starMessage,
    unstarMessage
}