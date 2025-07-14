import { Request, Response } from 'express';
import {
  getSellerPayments,
  getSellerPaymentByOrderId,
  getSellerEarnings,
  checkoutPayment,
  verifyPayment,
  getPaymentStatus
} from '../service/payment.service';
import { IPayment } from '../types/payment.types';

// Extend Express Request to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // add other user fields if needed
  };
}

// GET: All seller payments
const getSellerPaymentsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payments: IPayment[] = await getSellerPayments(req.user!.id);

    res.status(200).json({
      error: false,
      message: 'Payments retrieved successfully!',
      data: payments
    });
  } catch (error: any) {
    console.error('Get Seller Payments Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch payments'
    });
  }
};

// GET: Seller payment by order ID
const getSellerPaymentByOrderController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payment: IPayment | null = await getSellerPaymentByOrderId(req.user!.id, req.params.orderId);

    res.status(200).json({
      error: false,
      message: 'Payment fetched by order ID successfully!',
      data: payment
    });
  } catch (error: any) {
    console.error('Get Seller Payment By Order Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch payment'
    });
  }
};

// GET: Seller earnings
const getSellerEarningsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const earnings = await getSellerEarnings(req.user!.id);

    res.status(200).json({
      error: false,
      message: 'Earnings retrieved successfully!',
      data: earnings
    });
  } catch (error: any) {
    console.error('Get Seller Earnings Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch earnings'
    });
  }
};

// POST: Checkout payment
const checkoutPaymentController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await checkoutPayment(req.user!.id, req.body);

    res.status(200).json({
      error: false,
      message: 'Payment checkout successful!',
      data: result
    });
  } catch (error: any) {
    console.error('Checkout Payment Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Payment checkout failed'
    });
  }
};

// POST: Verify payment
const verifyPaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await verifyPayment(req.body);

    res.status(200).json({
      error: false,
      message: 'Payment verified successfully!',
      data: result
    });
  } catch (error: any) {
    console.error('Verify Payment Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Payment verification failed'
    });
  }
};

// GET: Buyer payment status
const getBuyerPaymentsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const buyerId = req.user!.id;
    const payments = await getPaymentStatus(buyerId);

    res.status(200).json({
      error: false,
      message: 'Buyer payments fetched successfully!',
      data: payments
    });
  } catch (error: any) {
    console.error('Get Buyer Payments Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch payments'
    });
  }
};

export {
  getSellerPaymentsController,
  getSellerPaymentByOrderController,
  getSellerEarningsController,
  checkoutPaymentController,
  verifyPaymentController,
  getBuyerPaymentsController
};
