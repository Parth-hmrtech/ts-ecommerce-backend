import Payment from '../models/payment';
import { IPayment } from '../types/payment.types';

const getSellerPayments = async (sellerId: string): Promise<IPayment[]> => {
  return await Payment.findAll({ where: { seller_id: sellerId } });
};

const getSellerPaymentByOrderId = async (
  sellerId: string,
  orderId: string
): Promise<IPayment | null> => {
  return await Payment.findOne({ where: { seller_id: sellerId, order_id: orderId } });
};

const getSellerEarnings = async (
  sellerId: string
): Promise<{ total_earnings: number; total_orders: number }> => {
  const payments = await Payment.findAll({
    where: {
      seller_id: sellerId,
      payment_status: 'success'
    }
  });

  let totalEarnings = 0;

  for (const pay of payments) {
    totalEarnings += parseFloat(pay.amount?.toString() || '0');
  }

  return {
    total_earnings: totalEarnings,
    total_orders: payments.length
  };
};

const checkoutPayment = async (
  buyerId: string,
  payload: Omit<IPayment, 'id' | 'buyer_id' | 'payment_status' | 'createdAt' | 'updatedAt'>
): Promise<IPayment> => {
  const newPayment = await Payment.create({
    buyer_id: buyerId,
    payment_status: 'pending',
    ...payload
  });

  return newPayment;
};

const verifyPayment = async ({
  transaction_id,
  status
}: {
  transaction_id: string;
  status: string;
}): Promise<boolean> => {
  const [affectedCount] = await Payment.update(
    { payment_status: status },
    { where: { transaction_id } }
  );

  return affectedCount > 0;
};

const getPaymentStatus = async (buyerId: string): Promise<IPayment[]> => {
  return await Payment.findAll({
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
