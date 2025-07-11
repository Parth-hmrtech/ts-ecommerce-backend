import { Request, Response } from 'express';
import {
  createCart,
  deleteCart,
  getCart,
  updateCart,
  deleteBuyerCart,
} from '../service/cart.service';
import { ICreateCartInput } from '../types/cart.types';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

const createCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, quantity } = req.body;

    const cart = await createCart({
      buyer_id: (req as AuthRequest).user.id,
      product_id,
      quantity,
    });

    res.status(200).json({
      error: false,
      message: 'Cart created successfully!',
      data: cart,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to create cart',
    });
  }
};

const getCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartItems = await getCart({
      id: (req as AuthRequest).user.id,
    });

    res.status(200).json({
      error: false,
      message: 'Cart retrieved successfully!',
      data: cartItems,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to get cart',
    });
  }
};

const updateCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCartItems = await updateCart({
      cartId: req.params.id,
      quantity: req.body.quantity,
    });

    res.status(200).json({
      error: false,
      message: 'Cart updated successfully!',
      data: updatedCartItems,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to update cart',
    });
  }
};

const deleteCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCart = await deleteCart(req.params.id);

    res.status(200).json({
      error: false,
      message: 'Cart deleted successfully!',
      data: deletedCart,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to delete cart',
    });
  }
};

const deleteBuyerCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteBuyerCart((req as AuthRequest).user.id);

    res.status(200).json({
      error: !result.success,
      message: result.message,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error('Error deleting buyer cart:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to delete buyer’s cart.',
    });
  }
};

export {
  createCartController,
  getCartController,
  updateCartController,
  deleteCartController,
  deleteBuyerCartController,
};
