import { Request, Response } from 'express';
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

interface AuthRequest extends Request {
  user: {
    id: string;
    [key: string]: any;
  };
}

const createBuyerOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const products = req.body.products;
    const orderDetails = await calculateOrderDetails(products);
    const order = await createOrder({
      buyer_id: user.id,
      ...orderDetails,
      ...req.body
    });

    res.status(200).json({
      error: false,
      message: 'Order created successfully!',
      data: order
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getBuyerOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const orders = await getBuyerOrders({ buyerId: user.id });

    res.status(200).json({
      error: false,
      message: 'Orders retrieved successfully!',
      data: orders
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getBuyerOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await getBuyerOrderById(req.params.id);

    res.status(200).json({
      error: false,
      message: 'Order retrieved by ID successfully!',
      data: order
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const cancelBuyerOrderController = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateBuyerOrderAddressController = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    throw new Error(String(error));
  }
};

const getSellerOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const orders = await getSellerOrders({ sellerId: user.id });

    res.status(200).json({
      error: false,
      message: 'Seller orders retrieved successfully!',
      data: orders
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getSellerOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await getSellerOrderById({ orderId: req.params.id });

    res.status(200).json({
      error: false,
      message: 'Order retrieved by ID successfully!',
      data: order
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateOrderStatusAndNotifyController = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    throw new Error(String(error));
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
