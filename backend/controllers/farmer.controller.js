import { generateJWTToken } from '../db/generateToken.js';
import { encryptData, comparePasswords } from '../db/hashPassword.js';
import Farmer from '../models/farmer.models.js';
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

        res.status(201).send({
            farmer: "Farmer registered successfully",
            userId: farmer._id.toString()
        });
        console.log("Farmer registered successfully")
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
            if (!comparePasswords(data.password, farmer.password)) return res.status(500).send({ message: "Invalid credentials" });
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

// Get a farmer by ID
const getFarmer = async (req, res) => {
    try {
        const farmer = req.farmer;
        if (!farmer) {
            const account = await Farmer.findById(req.params.id).select("profilePhoto username posts followers following");

            let partialAccount = {
                profilePhoto: profilePhoto,
                username: account.username,
                publicPosts: [],
                countFollwers: account.followers.length,
                countFollowing: account.following.length
            }
            // public posts
            const pubPosts = account.posts;


            // Fetch current farmer's posts
            const publicPostsPromises = pubPosts.map(async (postId) => {
                let post = await Post.findById(postId);
                return post;
            });

            publicPostsPromises = publicPostsPromises.filter(item => item.isPublic === true)

            let publicPosts = [];
            Promise.all(publicPostsPromises)
                .then((postObjArrays) => {
                    publicPosts = [...publicPosts, ...postObjArrays];
                    partialAccount.publicPosts = publicPosts
                    return res.status(201).send(partialAccount);
                })

        }
        else {
            if (farmer.following.indexOf(req.params.id) === -1) {
                const account = await Farmer.findById(req.params.id).select("profilePhoto username posts followers following");

                let partialAccount = {
                    profilePhoto: profilePhoto,
                    username: account.username,
                    publicPosts: [],
                    followers: account.followers,
                    following: account.following
                }
                // public posts
                const pubPosts = account.posts;


                // Fetch current farmer's posts
                const publicPostsPromises = pubPosts.map(async (postId) => {
                    let post = await Post.findById(postId);
                    return post;
                });

                publicPostsPromises = publicPostsPromises.filter(item => item.isPublic === true)

                let publicPosts = [];
                Promise.all(publicPostsPromises)
                    .then((postObjArrays) => {
                        publicPosts = [...publicPosts, ...postObjArrays];
                        partialAccount.publicPosts = publicPosts
                        return res.status(201).send(partialAccount);
                    })
            }
            else {
                const account = await Farmer.findById(req.params.id).select("-password -saved")
                res.status(200).send(account);
            }
        }
    } catch (error) {
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

            const hash_pass = await encryptData(password);
            req.body.password = hash_pass;
            let info = {
                ...req.body,
                profilePhoto: imageUrl
            }
            const updatedFarmer = await Farmer.findByIdAndUpdate(req.farmer._id, info, { new: true, runValidators: true });
            if (!updatedFarmer) {
                return res.status(404).send('Farmer not found');
            }
            return res.status(200).send(farmer);
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
        const saved = farmer.saved;

        let savedPosts = [];

        // Fetch saved posts
        const savedPostsPromises = saved.map(async (postId) => {
            let post = await Post.findById(postId);
            return post;
        });

        Promise.all(savedPostsPromises)
            .then((postObjArrays) => {
                savedPosts = [...savedPosts, ...postObjArrays];
                return res.status(201).send(savedPosts);
            })
            .catch((error) => {
                console.log('Error fetching posts:', error);
                return res.status(500).send('Internal Server Error');
            });
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
        const farmer = req.farmer;
        let following = farmer.following;
        following = following.filter((item) => item !== farmer._id)
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


        if (account.followers.indexOf(farmer._id) === -1) {
            return res.status(401).send("You cannot view followers");
        }

        const followers = farmer.followers;

        // Fetch followers
        const followersList = await Promise.all(followers.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId);
            return farmer;
        }));
        return res.status(200).send(followersList);
        
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
        
        
        if (account.followers.indexOf(farmer._id) === -1) {
            return res.status(401).send("You cannot view followers");
        }
        
        const following = farmer.following;
        
        // Fetch following
        const followingList = await Promise.all(following.map(async (farmerId) => {
            let farmer = await Farmer.findById(farmerId);
            return farmer;
        }));
        
        return res.status(200).send(followingList);
        
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export {
    createFarmer,
    loginFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer,
    logoutFarmer,
    getSavedPosts,
    followFarmer,
    unfollowFarmer,
    getFollowers,
    getFollowing
}