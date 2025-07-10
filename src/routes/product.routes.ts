import express from 'express';
import multer from 'multer';
import { userAuthMiddleware } from '../middleware/auth.middleware';
import {
  createProductController,
  imageProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  fatchAllProductController,
  getWishlistController,
  createWishlistController,
  deleteWishlistController,
} from '../controllers/product.controller';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/seller/products', userAuthMiddleware, getProductController);
router.post('/seller/products', userAuthMiddleware, createProductController);
router.post('/seller/products/image', userAuthMiddleware, upload.array('image', 5), imageProductController);
router.put('/seller/products/:id', userAuthMiddleware, updateProductController);
router.delete('/seller/products/:id', userAuthMiddleware, deleteProductController);

router.get('/buyer/products', fatchAllProductController);
router.get('/buyer/products/:productId', getProductByIdController);

router.post('/buyer/wishlist', userAuthMiddleware, createWishlistController);
router.get('/buyer/wishlist', userAuthMiddleware, getWishlistController);
router.delete('/buyer/wishlist/:productId', userAuthMiddleware, deleteWishlistController);

export default router;
