import express from 'express';
import { createFarmer, getFarmers, getFarmerProfile, getFarmer, updateFarmer, deleteFarmer, loginFarmer, logoutFarmer, getSavedPosts, followFarmer, unfollowFarmer, getFollowers, getFollowing, starMessage, unstarMessage } from '../controllers/farmer.controller.js';
import validateFarmer from '../middlewares/validateFarmer.js';
import { verifyToken } from '../db/generateToken.js';
import { getLoginFarmer, isFarmerSignin } from '../middlewares/isAuthenticated.js';
import imageUpload from '../middlewares/uploadImage.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/', validateFarmer, upload.single("profile"), imageUpload, createFarmer);
router.post('/login', loginFarmer);
router.post('/logout', isFarmerSignin, logoutFarmer);
router.get('/verifyToken', verifyToken);
router.get('/profile', isFarmerSignin, getFarmerProfile);
router.get('/', getLoginFarmer, getFarmers);
router.get('/saved', isFarmerSignin, getSavedPosts)
router.patch('/', isFarmerSignin, upload.single("profile"), imageUpload, updateFarmer);
router.delete('/', isFarmerSignin, deleteFarmer);

router.patch('/follow/:id', isFarmerSignin, followFarmer)
router.patch('/unfollow/:id', isFarmerSignin, unfollowFarmer)
router.get('/followers/:id', isFarmerSignin, getFollowers)
router.get('/following/:id', isFarmerSignin, getFollowing)

router.patch('/star/:messageId', isFarmerSignin, starMessage);
router.patch('/unstar/:messageId', isFarmerSignin, unstarMessage);
router.get('/:id', getLoginFarmer, getFarmer);


export default router;