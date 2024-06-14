import express from 'express';
import { createFarmer, getFarmers, getFarmer, updateFarmer, deleteFarmer, loginFarmer, logoutFarmer } from '../controllers/farmer.controller.js';
import validateFarmer from '../middlewares/validateFarmer.js';
import { verifyToken } from '../db/generateToken.js';
import {getLoginFarmer, isFarmerSignin} from '../middlewares/isAuthenticated.js';
import imageUpload from '../middlewares/uploadImage.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/',validateFarmer, upload.single("profilePhoto"), imageUpload, createFarmer);
router.post('/login',loginFarmer);
router.post('/logout', isFarmerSignin, logoutFarmer);
router.get('/verifyToken',verifyToken);
router.get('/', getLoginFarmer, getFarmers);
router.get('/:id', getLoginFarmer, getFarmer);
router.patch('/', isFarmerSignin, upload.single("profilePhoto"), imageUpload, updateFarmer);
router.delete('/', isFarmerSignin, deleteFarmer);


export default router;