import express from 'express';
import { userAuthMiddleware } from '@/middleware/auth.middleware.ts';
import {
    createCartController,
    getCartController,
    updateCartController,
    deleteCartController,
    deleteBuyerCartController
} from '@/controllers/cart.controller.ts';

const router = express.Router();

router.post('/buyer/cart', userAuthMiddleware, createCartController);
router.get('/buyer/cart', userAuthMiddleware, getCartController);
router.put('/buyer/cart/:id', userAuthMiddleware, updateCartController);
router.delete('/buyer/cart/:id', userAuthMiddleware, deleteCartController);
router.delete('/buyer/cart/buyerId/:buyerId', userAuthMiddleware,deleteBuyerCartController);

export default router;
