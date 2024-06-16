import express from 'express';
import { isFarmerSignin, isShopkeeperSignin } from '../middlewares/isAuthenticated.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/uploadImage.js';
import { createProduct, deleteProduct, deleteReview, getCurrentShopkeeperProducts, getProduct, getProducts, getReviews, giveReview, ratingProduct, updateProduct, updateReview } from '../controllers/product.controller.js';

const router = express.Router();


router.post('/createProduct',isShopkeeperSignin, upload.single("productImage"), imageUpload, createProduct)
router.get('/', getProducts)
router.get('/myProducts', isShopkeeperSignin, getCurrentShopkeeperProducts)
router.get('/:id', getProduct)
router.put('/:id', isShopkeeperSignin, upload.single("productImage"), imageUpload, updateProduct)
router.delete('/:id', isShopkeeperSignin, deleteProduct);

router.patch('/:id/rating', isFarmerSignin, ratingProduct);
router.patch('/:id/review', isFarmerSignin, upload.single("reviewImage"), imageUpload, giveReview)
router.patch('/:id/review/:reviewId', isFarmerSignin, upload.single("reviewImage"), imageUpload, updateReview)
router.patch('/:id/review/delete/:reviewId', isFarmerSignin, deleteReview)
router.get('/:id/reviews', getReviews)




export default router;