import { Request, Response, RequestHandler } from 'express';
import {
  createOrder,
  getSellerOrders,
  getSellerOrderById,
  updateOrderStatus,
  sendOrderAcceptedNotification,
  getBuyerOrders,
  getBuyerOrderById,
  cancelBuyerOrder,
  updateBuyerOrderAddress,
  calculateOrderDetails,
  deleteOrderItem
} from '../service/order.service';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    [key: string]: any;
  };
}

const createBuyerOrderController: RequestHandler = async (req, res): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  try {
    const products = authReq.body.products;
    const orderDetails = await calculateOrderDetails(products);
        console.log(orderDetails);

    const order = await createOrder({
      buyer_id: authReq.user.id,
      ...orderDetails,
      ...authReq.body
    });
    
    res.status(200).json({
      error: false,
      message: 'Order created successfully!',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to create order.',
      details: error.message
    });
  }
};

const getBuyerOrdersController: RequestHandler = async (req, res): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  try {
    const orders = await getBuyerOrders({ buyerId: authReq.user.id });

    res.status(200).json({
      error: false,
      message: 'Orders retrieved successfully!',
      data: orders
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve orders.',
      details: error.message
    });
  }
};

const getBuyerOrderByIdController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const order = await getBuyerOrderById(req.params.id);

    res.status(200).json({
      error: false,
      message: 'Order retrieved by ID successfully!',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve order by ID.',
      details: error.message
    });
  }
};

const cancelBuyerOrderController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const cancelledOrder = await cancelBuyerOrder(req.params.id);
    const deletedItems = await deleteOrderItem(req.params.id);

    res.status(200).json({
      error: false,
      message: 'Order cancelled successfully!',
      data: {
        cancelledOrder,
        deletedItems
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to cancel order.',
      details: error.message
    });
  }
};

const updateBuyerOrderAddressController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const updatedAddress = await updateBuyerOrderAddress({
      id: req.params.id,
      ...req.body
    });

    res.status(200).json({
      error: false,
      message: 'Order address updated successfully!',
      data: updatedAddress
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to update address.',
      details: error.message
    });
  }
};

const getSellerOrdersController: RequestHandler = async (req, res): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  try {
    const orders = await getSellerOrders({ sellerId: authReq.user.id });

    res.status(200).json({
      error: false,
      message: 'Seller orders retrieved successfully!',
      data: orders
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve seller orders.',
      details: error.message
    });
  }
};

const getSellerOrderByIdController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const order = await getSellerOrderById({ orderId: req.params.id });

    res.status(200).json({
      error: false,
      message: 'Order retrieved by ID successfully!',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve order by ID.',
      details: error.message
    });
  }
};

const updateOrderStatusAndNotifyController: RequestHandler = async (req, res): Promise<void> => {
  try {
    const orderId = req.params.id;
    const newStatus: string = req.body.status;

    const updatedOrderStatus = await updateOrderStatus(orderId, newStatus);
    let emailResult = null;

    if (newStatus === 'accepted') {
      emailResult = await sendOrderAcceptedNotification(orderId);
    }

    res.status(200).json({
      error: false,
      message: `Order status updated to "${newStatus}" successfully!` +
        (emailResult ? ' Email sent successfully!' : ''),
      data: {
        order: updatedOrderStatus,
        ...(emailResult && { email: emailResult })
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: 'Failed to update order status.',
      details: error.message
    });
  }
};

export {
  getSellerOrdersController,
  getSellerOrderByIdController,
  createBuyerOrderController,
  getBuyerOrdersController,
  getBuyerOrderByIdController,
  cancelBuyerOrderController,
  updateBuyerOrderAddressController,
  updateOrderStatusAndNotifyController
};
