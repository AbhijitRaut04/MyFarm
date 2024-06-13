import express from 'express';
import { createFarmer, getFarmers, getFarmer, updateFarmer, deleteFarmer, loginFarmer, logoutFarmer } from '../controllers/farmer.controller.js';
import validateFarmer from '../middlewares/validateFarmer.js';
import { verifyToken } from '../db/generateToken.js';
import {getLoginFarmer, isFarmerSignin} from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/',validateFarmer, createFarmer);
router.post('/login',loginFarmer);
router.post('/logout', isFarmerSignin, logoutFarmer);
router.get('/verifyToken',verifyToken);
router.get('/', getLoginFarmer, getFarmers);
router.get('/:id', getLoginFarmer, getFarmer);
router.put('/', isFarmerSignin, updateFarmer);
router.delete('/', isFarmerSignin, deleteFarmer);


export default router;