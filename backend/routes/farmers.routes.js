import express from 'express';
import { createFarmer, getFarmers, getFarmer, updateFarmer, deleteFarmer, loginFarmer, logoutFarmer } from '../controllers/farmer.controller.js';
import validateFarmer from '../middlewares/validateFarmer.js';
import { verifyToken } from '../db/generateToken.js';

const router = express.Router();

router.post('/',validateFarmer, createFarmer);
router.post('/login',loginFarmer);
router.post('/logout',logoutFarmer);
router.get('/verifyToken',verifyToken);
router.get('/', getFarmers);
router.get('/:id', getFarmer);
router.put('/:id',validateFarmer, updateFarmer);
router.delete('/:id', deleteFarmer);


export default router;