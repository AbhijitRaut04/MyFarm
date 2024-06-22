import { generateJWTToken } from '../db/generateToken.js';
import { comparePasswords, encryptData } from '../db/hashPassword.js';
import Shopkeeper from '../models/shopkeeper.models.js';

// Create a new shopkeeper
const createShopkeeper = async (req, res) => {
    try {
        let { name, email, password, shopName, location, imageUrl } = req.body;
        const hash_pass = await encryptData(password);
        password = hash_pass;
        let info = {
            name,
            email,
            password,
            shopName,
            location,
            profilePhoto: imageUrl
        }
        const shopkeeper = await Shopkeeper.create(info);

        res.status(201).send({
            shopkeeper: "Shopkeeper registered successfully",
            userId: shopkeeper._id.toString()
        });
        console.log("Shopkeeper registered successfully")
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}


// login shopkeeper
const loginShopkeeper = async (req, res) => {
    try {
        const data = req.body;
        const shopkeeper = await Shopkeeper.findOne({ email: data.email });
        if (!shopkeeper) {
            console.log("Shopkeeper does not exists")
            res.status(401).send({ message: "Shopkeeper not registered yet!" })
        }
        else {
            if (!comparePasswords(data.password, shopkeeper.password)) return res.status(500).send({ message: "Invalid credentials" });
            else {
                console.log("Shopkeeper Logged in")
                const token = generateJWTToken(shopkeeper);

                res.cookie("token", token)
                res.status(201).send({ token: token });
            }
        }
    }
    catch (error) {
        res.status(500).send({ message: "Invalid credentials" });
    }
}

// logout shopkeeper
const logoutShopkeeper = (req, res) => {
    try {
        res.cookie("token", "")
        console.log("Shopkeeper logout")
        res.status(201).send({ message: "Logout Successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Invalid credentials" });
    }
}

// view profile
const getCurrentShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findById(req.shopkeeper._id);
        if (!shopkeeper) {
            return res.status(404).send('Shopkeeper not found');
        }
        res.status(200).send(shopkeeper);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a shopkeeper by ID
const updateShopkeeper = async (req, res) => {
    try {
        let { password, imageUrl } = req.body;

        if (!password && !imageUrl) {
            const shopkeeper = await Shopkeeper.findByIdAndUpdate(req.shopkeeper._id, req.body, { new: true, runValidators: true });
            if (!shopkeeper) {
                return res.status(404).send('Shopkeeper not found');
            }
            return res.status(200).send(shopkeeper);
        }
        else {
            const shopkeeper = await Shopkeeper.findById(req.farmer._id);
            if (!shopkeeper) {
                return res.status(404).send('Farmer not found');
            }

            const hash_pass = await encryptData(password);
            req.body.password = hash_pass;
            let info = {
                ...req.body,
                profilePhoto: imageUrl
            }
            const updatedShopkeeper = await Shopkeeper.findByIdAndUpdate(req.farmer._id, info, { new: true, runValidators: true });
            if (!updatedShopkeeper) {
                return res.status(404).send('Shopkeeper not found');
            }
            return res.status(200).send(shopkeeper);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a shopkeeper by ID
const deleteShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findByIdAndDelete(req.shopkeeper._id);
        if (!shopkeeper) {
            return res.status(404).send('Shopkeeper not found');
        }
        res.status(200).send('Shopkeeper deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to get all shopkeepers from the database
const getAllShopkeepers = async (req, res) => {
  try {
    const shopkeepers = await Shopkeeper.find({});
    res.status(200).json(shopkeepers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shopkeepers', error: error.message });
  }
};

export {
    createShopkeeper,
    loginShopkeeper,
    logoutShopkeeper,
    getCurrentShopkeeper,
    updateShopkeeper,
    deleteShopkeeper,
    getAllShopkeepers
}