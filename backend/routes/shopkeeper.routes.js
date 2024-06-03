import express from 'express';
import { createShopkeeper, getShopkeepers, getShopkeeper, updateShopkeeper, deleteShopkeeper } from '../controllers/shopkeeper.controller.js';
import validateShopkeeper from '../middlewares/validateShopkeeper.js';


const router = express.Router();

router.post('/',validateShopkeeper, createShopkeeper);
router.get('/', getShopkeepers);
router.get('/:id', getShopkeeper);
router.put('/:id',validateShopkeeper, updateShopkeeper);
router.delete('/:id', deleteShopkeeper);


export default router;