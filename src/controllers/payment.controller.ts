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

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

const getSellerPaymentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const payments: IPayment[] = await getSellerPayments(user.id);

    res.status(200).json({
      error: false,
      message: 'Payments retrieved successfully!',
      data: payments
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getSellerPaymentByOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const payment: IPayment | null = await getSellerPaymentByOrderId(user.id, req.params.orderId);

    res.status(200).json({
      error: false,
      message: 'Payment fetched by order ID successfully!',
      data: payment
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getSellerEarningsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const earnings = await getSellerEarnings(user.id);

    res.status(200).json({
      error: false,
      message: 'Earnings retrieved successfully!',
      data: earnings
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const checkoutPaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const result = await checkoutPayment(user.id, req.body);

    res.status(200).json({
      error: false,
      message: 'Payment checkout successful!',
      data: result
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const verifyPaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await verifyPayment(req.body);

    res.status(200).json({
      error: false,
      message: 'Payment verified successfully!',
      data: result
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getBuyerPaymentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const payments = await getPaymentStatus(user.id);

    res.status(200).json({
      error: false,
      message: 'Buyer payments fetched successfully!',
      data: payments
    });
  } catch (error) {
    throw new Error(String(error));
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
