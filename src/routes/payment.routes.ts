import express from 'express';
import {
    getSellerPaymentsController,
    getSellerPaymentByOrderController,
    getSellerEarningsController,
    checkoutPaymentController,
    verifyPaymentController,
    getBuyerPaymentsController
} from '../controllers/payment.controller.ts';
import { userAuthMiddleware } from '../middleware/auth.middleware.ts';

const router = express.Router();

router.get('/seller/payments',userAuthMiddleware,getSellerPaymentsController);
router.get('/seller/payments/:orderId',userAuthMiddleware, getSellerPaymentByOrderController);
router.get('/seller/earnings', userAuthMiddleware,getSellerEarningsController);
router.post('/buyer/payments/checkout', userAuthMiddleware,checkoutPaymentController);
router.post('/buyer/payments/verify',userAuthMiddleware, verifyPaymentController);
router.get('/buyer/payments/status',userAuthMiddleware, getBuyerPaymentsController);

export default router;
