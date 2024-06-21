import express from 'express';
import { isFarmerSignin } from '../middlewares/isAuthenticated.js'
import {  getChats, getMessagesFromChat, getParticipantsFromChat, sendChat } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/', isFarmerSignin , getChats);
router.get('/messages/:chatId', isFarmerSignin , getMessagesFromChat);
router.get('/participants/:chatId', isFarmerSignin , getParticipantsFromChat);

router.post('/:chatId', isFarmerSignin, sendChat);

export default router;
