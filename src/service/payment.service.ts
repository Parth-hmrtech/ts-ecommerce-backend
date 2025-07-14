import payment from '../models/payment';
import { IPayment, IPaymentCreation } from '../types/payment.types';

const getSellerPayments = async (sellerId: string): Promise<IPayment[]> => {
  return await payment.findAll({ where: { seller_id: sellerId } });
};

const getSellerPaymentByOrderId = async (sellerId: string, orderId: string): Promise<IPayment | null> => {
  return await payment.findOne({ where: { seller_id: sellerId, order_id: orderId } });
};

const getSellerEarnings = async (sellerId: string): Promise<{ total_earnings: number; total_orders: number }> => {

  const payments = await payment.findAll({
    where: {
      seller_id: sellerId,
      payment_status: 'success'
    }
  });

  let totalEarnings = 0;

  for (const pay of payments) {
    totalEarnings += parseFloat(String(pay.amount ?? 0));
  }

  return {
    total_earnings: totalEarnings,
    total_orders: payments.length
  };
};

const checkoutPayment = async (buyerId: string, payload: Omit<IPaymentCreation, 'buyer_id' | 'payment_status'>): Promise<IPayment> => {

  const newPayment = await payment.create({
    buyer_id: buyerId,
    payment_status: 'pending',
    ...payload
  });

  return newPayment;
};

const verifyPayment = async ({ transaction_id, status }: { transaction_id: string; status: string; }): Promise<boolean> => {

  const updated = await payment.update(
    { payment_status: status },
    { where: { transaction_id } }
  );

  return updated[0] > 0;
};

const getPaymentStatus = async (buyerId: string): Promise<IPayment[]> => {
  return await payment.findAll({
    where: {
      buyer_id: buyerId
    },
    order: [['createdAt', 'DESC']]
  });
};

export {
  getSellerPayments,
  getSellerPaymentByOrderId,
  getSellerEarnings,
  checkoutPayment,
  verifyPayment,
  getPaymentStatus
};
