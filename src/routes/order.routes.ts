import express from 'express';
import {
    getSellerOrdersController,
    getSellerOrderByIdController,
    updateOrderStatusAndNotifyController,
    createBuyerOrderController,
    getBuyerOrdersController,
    getBuyerOrderByIdController,
    cancelBuyerOrderController,
    updateBuyerOrderAddressController,
} from '@/controllers/order.controller.ts';

import { userAuthMiddleware } from '@/middleware/auth.middleware.ts';

const router = express.Router();

router.get('/seller/orders', userAuthMiddleware, getSellerOrdersController);
router.get('/seller/orders/:id', userAuthMiddleware, getSellerOrderByIdController);
router.put('/seller/orders/:id/status', userAuthMiddleware, updateOrderStatusAndNotifyController);

router.post('/buyer/orders', userAuthMiddleware, createBuyerOrderController);
router.get('/buyer/orders', userAuthMiddleware, getBuyerOrdersController);
router.get('/buyer/orders/:id', userAuthMiddleware, getBuyerOrderByIdController);
router.delete('/buyer/orders/:id', userAuthMiddleware, cancelBuyerOrderController);
router.put('/buyer/orders/:id/update-address', userAuthMiddleware, updateBuyerOrderAddressController);

export default router;

