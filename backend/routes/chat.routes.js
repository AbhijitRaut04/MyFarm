import express from 'express';
import { isFarmerSignin } from '../middlewares/isAuthenticated.js'
import {  createChat, getChats, getMessagesFromChat, getParticipantsFromChat, deleteChat, getChat } from '../controllers/chat.controller.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/uploadImage.js';

const router = express.Router();

router.post('/', isFarmerSignin, upload.single("groupPhoto"), imageUpload , createChat);
router.get('/', isFarmerSignin , getChats);
router.get('/messages/:chatId', isFarmerSignin , getMessagesFromChat);
router.get('/participants/:chatId', isFarmerSignin , getParticipantsFromChat);

router.get('/:chatId', isFarmerSignin, getChat);
router.delete('/:chatId', isFarmerSignin, deleteChat);

export default router;
