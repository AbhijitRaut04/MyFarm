import express from 'express';
import { createExpert, getExperts, getExpert, updateExpert, deleteExpert } from '../controllers/expert.controller.js';
import { isAdmin } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.use(isAdmin); // only admin can access and add experts

router.post('/', createExpert);
router.get('/', getExperts);
router.get('/:id', getExpert);
router.put('/:id', updateExpert);
router.delete('/:id', deleteExpert);


export default router;