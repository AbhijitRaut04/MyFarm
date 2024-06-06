import express from 'express';
import { createFarmer, getFarmers, getFarmer, updateFarmer, deleteFarmer, loginFarmer } from '../controllers/farmer.controller.js';
import validateFarmer from '../middlewares/validateFarmer.js';

const router = express.Router();

router.post('/',validateFarmer, createFarmer);
router.post('/login',loginFarmer);
router.get('/', getFarmers);
router.get('/:id', getFarmer);
router.put('/:id',validateFarmer, updateFarmer);
router.delete('/:id', deleteFarmer);


export default router;