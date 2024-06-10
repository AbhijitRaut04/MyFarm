import express from 'express';
import imageUpload from '../db/uploadImage.js';
import isSignin from '../middlewares/isAuthenticated.js';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();


router.post('/upload-image',isSignin, imageUpload)
router.post('/createPost', isSignin, createPost)
router.get('/', isSignin, getPosts)
router.get('/:id', isSignin, getPost)
router.put('/:id', isSignin, updatePost)
router.delete('/:id', isSignin, deletePost);


export default router;