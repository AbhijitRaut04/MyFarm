import express from 'express';
import imageUpload from '../db/uploadImage.js';
import {isFarmerSignin, getLoginFarmer} from '../middlewares/isAuthenticated.js';
import { createPost, deletePost, getPost, getFeeds, updatePost, getCurrentFarmerPosts } from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();


// router.post('/upload-image',isFarmerSignin, upload.single("image"), imageUpload)
router.post('/createPost',isFarmerSignin, upload.single("media"), imageUpload, createPost)
router.get('/', getLoginFarmer, getFeeds)
router.get('/myPosts', isFarmerSignin, getCurrentFarmerPosts)
router.get('/:id', getLoginFarmer, getPost)
router.put('/:id', isFarmerSignin, updatePost)
router.delete('/:id', isFarmerSignin, deletePost);


export default router;