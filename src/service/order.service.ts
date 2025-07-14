import { Transaction } from 'sequelize';
import order from '../models/order';
import users from '../models/user';
import product from '../models/products';
import sequelize from '../config/dbConnect';
import order_items from '../models/orderItem';
import { sendOrderAcceptedEmail } from '../utils/emailOrderService';

import { IOrder } from '../types/order.types';
import { ICreateOrderItem } from '../types/orderItem.types';

interface ProductInput {
  product_id: string;
  quantity: number;
}

interface CreateOrderInput {
  buyer_id: string;
  products: ProductInput[];
  delivery_address?: string;
  seller_id?: string;
  total_amount?: number;
  [key: string]: any;
}

const createOrder = async ({ buyer_id, products, ...orderBody }: CreateOrderInput): Promise<IOrder> => {

  const t: Transaction = await sequelize.transaction();

  try {

    const orderRecord = await order.create(
      {
        buyer_id,
        ...orderBody,
        order_date: new Date(),
        status: 'Pending',
      },
      { transaction: t }
    );

    const orderItemsData: ICreateOrderItem[] = [];

    for (const item of products) {

      const { product_id, quantity } = item;
      const productData = await product.findByPk(product_id, { transaction: t });

      if (!productData) throw new Error(`Product with ID ${product_id} not found`);
      if (productData.price == null) throw new Error(`Price is missing for product ID ${product_id}`);

      orderItemsData.push({

        order_id: orderRecord.id,
        product_id,
        seller_id: productData.seller_id,
        price: productData.price,
        quantity,
        subtotal: quantity * Number(productData.price),

      });

    }

    if (orderItemsData.length === 0) {
      throw new Error('No order items prepared for creation.');
    }

    await order_items.bulkCreate(orderItemsData, {
      transaction: t,
      validate: true,
    });

    await t.commit();

    return orderRecord;

  } catch (error) {

    await t.rollback();

    console.error('Order creation failed:', error);

    throw error;

  }
};

const getBuyerOrders = async ({ buyerId }: { buyerId: string }): Promise<IOrder[]> => {

  return await order.findAll({
    where: { buyer_id: buyerId },
    include: [{ model: order_items }],
  });

};

const getBuyerOrderById = async (orderId: string): Promise<IOrder | null> => {

  return await order.findByPk(orderId);

};

const cancelBuyerOrder = async (orderId: string): Promise<IOrder> => {

  const existingOrder = await order.findByPk(orderId);

  if (!existingOrder) throw new Error('Order not found');

  existingOrder.status = 'Cancelled';

  return await existingOrder.save();

};

const updateBuyerOrderAddress = async ({ id, delivery_address, }: { id: string; delivery_address: string; }): Promise<IOrder> => {

  const existingOrder = await order.findByPk(id);

  if (!existingOrder) throw new Error('Order not found');

  existingOrder.delivery_address = delivery_address;

  return await existingOrder.save();

};

const getSellerOrders = async ({ sellerId }: { sellerId: string }): Promise<IOrder[]> => {

  return await order.findAll({
    where: { seller_id: sellerId },
    include: [{ model: order_items }],
  });

};

const getSellerOrderById = async ({ orderId }: { orderId: string }): Promise<IOrder | null> => {

  return await order.findByPk(orderId, {
    include: [{ model: order_items }],
  });

};

const updateOrderStatus = async (orderId: string, status: string): Promise<IOrder> => {

  const existingOrder = await order.findByPk(orderId);

  if (!existingOrder) throw new Error('Order not found');

  existingOrder.status = status;

  return await existingOrder.save();

};

const sendOrderAcceptedNotification = async (orderId: string): Promise<{ emailSentTo: string }> => {

  const existingOrder = await order.findByPk(orderId);
  if (!existingOrder) throw new Error('Order not found');

  const buyer = await users.findByPk(existingOrder.buyer_id || '');
  if (!buyer || !buyer.email) throw new Error('Buyer or buyer email not found');

  await sendOrderAcceptedEmail(buyer.email, orderId);

  return { emailSentTo: buyer.email };
};

const calculateOrderDetails = async (products: ProductInput[]): Promise<{ seller_id: string; total_amount: number }> => {
  
  let total_amount = 0;
  let seller_id: string | null = null;

  for (const item of products) {
  
    const productData = await product.findByPk(item.product_id);
  
    if (!productData) throw new Error(`Product with ID ${item.product_id} not found`);
    if (productData.price == null) throw new Error(`Price missing for product ID ${item.product_id}`);

    if (!seller_id) seller_id = productData.seller_id;
    total_amount += item.quantity * Number(productData.price);
  
  }

  if (!seller_id) throw new Error('No seller found for products');

  return { seller_id, total_amount };

};

const deleteOrderItem = async (orderId: string): Promise<number> => {

  return await order_items.destroy({
    where: { order_id: orderId },
  });

};

export {
  createOrder,
  getSellerOrders,
  getSellerOrderById,
  updateOrderStatus,
  getBuyerOrders,
  getBuyerOrderById,
  cancelBuyerOrder,
  updateBuyerOrderAddress,
  calculateOrderDetails,
  sendOrderAcceptedNotification,
  deleteOrderItem,
};
