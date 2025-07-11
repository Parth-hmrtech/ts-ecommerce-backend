import Cart from '../models/cart';
import {
  ICart,
  ICreateCartInput,
  IGetCartInput,
  IUpdateCartInput,
} from '../types/cart.types';

const createCart = async ({ buyer_id, product_id, quantity }: ICreateCartInput): Promise<ICart> => {
  const cartItem = await Cart.create({
    buyer_id,
    product_id,
    quantity,
  });
  return cartItem;
};

const getCart = async ({ id }: IGetCartInput): Promise<ICart[]> => {
  const cartItems = await Cart.findAll({
    where: { buyer_id: id },
    order: [['created_at', 'ASC']],
  });
  return cartItems;
};

const updateCart = async ({ cartId, quantity }: IUpdateCartInput): Promise<boolean> => {
  const [updatedCount] = await Cart.update({ quantity }, { where: { id: cartId } });
  return updatedCount > 0;
};

const deleteCart = async (cartId: string): Promise<number> => {
  const deletedCount = await Cart.destroy({
    where: { id: cartId },
  });
  return deletedCount;
};

const deleteBuyerCart = async (buyerId: string): Promise<{
  success: boolean;
  message: string;
  deletedCount: number;
}> => {
  try {
    const deletedCount = await Cart.destroy({
      where: { buyer_id: buyerId },
    });

    if (deletedCount > 0) {
      return {
        success: true,
        message: 'Buyer cart deleted successfully.',
        deletedCount,
      };
    } else {
      return {
        success: false,
        message: 'No cart items found for this buyer.',
        deletedCount: 0,
      };
    }
  } catch (error) {
    console.error('Service Error in deleteBuyerCart:', error);
    return {
      success: false,
      message: 'Error deleting buyer cart.',
      deletedCount: 0,
    };
  }
};

export {
  createCart,
  getCart,
  updateCart,
  deleteCart,
  deleteBuyerCart,
};
