import express from 'express';
import { createShopkeeper, updateShopkeeper, deleteShopkeeper, loginShopkeeper, logoutShopkeeper, getCurrentShopkeeper } from '../controllers/shopkeeper.controller.js';
import validateShopkeeper from '../middlewares/validateShopkeeper.js';
import { isShopkeeperSignin } from '../middlewares/isAuthenticated.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/uploadImage.js';


const router = express.Router();

router.post('/',validateShopkeeper, upload.single("profilePhoto"), imageUpload, createShopkeeper);
router.post('/login',loginShopkeeper);
router.post('/logout', isShopkeeperSignin, logoutShopkeeper);
router.get('/', isShopkeeperSignin, getCurrentShopkeeper);
router.put('/update', isShopkeeperSignin, upload.single("profilePhoto"), imageUpload, updateShopkeeper);
router.delete('/', isShopkeeperSignin, deleteShopkeeper);


export default router;