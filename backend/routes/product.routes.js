import express from 'express';
import { isFarmerSignin, isShopkeeperSignin } from '../middlewares/isAuthenticated.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/uploadImage.js';
import { addProductToCart, cancleOrder, createProduct, deleteProduct, deleteReview, deliverOrder, dispatchOrder, getCartItems, getCurrentShopkeeperProducts, getProduct, getProducts, getReviews, giveReview, placeOrder, ratingProduct, removeProductFromCart, updateProduct, updateReview } from '../controllers/product.controller.js';

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

router.patch('/:id/addToCart', isFarmerSignin, addProductToCart)
router.patch('/:id/removeFromCart', isFarmerSignin, removeProductFromCart)
router.patch('/cart', isFarmerSignin, getCartItems)
router.patch('/order', isFarmerSignin, placeOrder)
router.patch('/:id/cancle', isFarmerSignin, cancleOrder)
router.patch('/:id/dispatch', isShopkeeperSignin, dispatchOrder)
router.patch('/:id/deliver', isShopkeeperSignin, deliverOrder)




export default router;