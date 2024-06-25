import express from 'express';
import { isFarmerSignin } from '../middlewares/isAuthenticated.js'
import { deleteMessage, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.patch('/', isFarmerSignin , sendMessage);
// router.get('/', isFarmerSignin , getChats);
// router.get('/messages/:chatId', isFarmerSignin , getMessagesFromChat);
// router.get('/participants/:chatId', isFarmerSignin , getParticipantsFromChat);

router.delete('/:messageId', isFarmerSignin, deleteMessage);

export default router;