import { Request, Response, NextFunction } from 'express';
import {
  getSellerPayments,
  getSellerPaymentByOrderId,
  getSellerEarnings,
  checkoutPayment,
  verifyPayment,
  getPaymentStatus,
} from '../service/payment.service';

// Assuming your auth middleware attaches `user` with `id` to the request
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const getSellerPaymentsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payments = await getSellerPayments(req.user!.id);
    res.status(200).json({
      error: false,
      message: 'Payment retrieved successfully!',
      data: payments,
    });
  } catch (error: any) {
    next(error);
  }
};

const getSellerPaymentByOrderController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await getSellerPaymentByOrderId(req.user!.id, req.params.orderId);
    res.status(200).json({
      error: false,
      message: 'Payment fetched by order ID successfully!',
      data: payment,
    });
  } catch (error: any) {
    next(error);
  }
};

const getSellerEarningsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const earnings = await getSellerEarnings(req.user!.id);
    res.status(200).json({
      error: false,
      message: 'Earnings retrieved successfully!',
      data: earnings,
    });
  } catch (error: any) {
    next(error);
  }
};

const checkoutPaymentController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await checkoutPayment(req.user!.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Payment checkout successful!',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const verifyPaymentController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await verifyPayment(req.body);
    res.status(200).json({
      error: false,
      message: 'Payment verified successfully!',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getBuyerPaymentsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payments = await getPaymentStatus(req.user!.id);
    res.status(200).json({
      error: false,
      message: 'Buyer payments fetched successfully!',
      data: payments,
    });
  } catch (error: any) {
    console.error('Get Buyer Payments Error:', error.message);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch payments',
    });
  }
};

export {
  getSellerPaymentsController,
  getSellerPaymentByOrderController,
  getSellerEarningsController,
  checkoutPaymentController,
  verifyPaymentController,
  getBuyerPaymentsController,
};
