import express from 'express';
import imageUpload from '../middlewares/uploadImage.js';
import {isFarmerSignin, getLoginFarmer} from '../middlewares/isAuthenticated.js';
import { createPost, deletePost, getPost, getFeeds, updatePost, getCurrentFarmerPosts, likePost, unlikePost, comment, deleteComment, editComment, savePost, unsavePost, getFarmersWhoLikedPost, getComments } from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();


router.post('/createPost',isFarmerSignin, upload.single("media"), imageUpload, createPost)
router.get('/', getLoginFarmer, getFeeds)
router.get('/myPosts', isFarmerSignin, getCurrentFarmerPosts)
router.get('/:id', getLoginFarmer, getPost)
router.put('/:id', isFarmerSignin, upload.single("media"), imageUpload, updatePost)
router.delete('/:id', isFarmerSignin, deletePost);


router.patch('/:id/like', isFarmerSignin, likePost)
router.patch('/:id/unlike', isFarmerSignin, unlikePost)
router.patch('/:id/comment', isFarmerSignin, comment)
router.patch('/:id/comment/:commentId/delete', isFarmerSignin, deleteComment)
router.patch('/:id/editComment/:commentId', isFarmerSignin, editComment)
router.patch('/:id/save', isFarmerSignin, savePost)
router.patch('/:id/unsave', isFarmerSignin, unsavePost)

router.get('/:id/likes', getFarmersWhoLikedPost)
router.get('/:id/comment', getComments)


export default router;