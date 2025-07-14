import { Request, Response } from 'express';
import {
  createReview,
  getSellerReviews,
  getReviewsByProduct,
  deleteReviewByBuyer,
  deleteReviewBySeller,
  updateReviewByBuyer,
} from '../service/review.service';

interface IAuthRequest extends Request {
  user: {
    id: string;
  };
}

const createReviewFromOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newReview = await createReview(req.body);

    res.status(201).json({
      error: false,
      message: 'Review submitted successfully!',
      data: newReview,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getAllSellerReviewsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;
    const reviews = await getSellerReviews({ seller_id: user.id });

    res.status(200).json({
      error: false,
      message: 'Seller reviews fetched successfully!',
      data: reviews,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getProductReviewsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await getReviewsByProduct(req.params.productId);

    res.status(200).json({
      error: false,
      message: 'Product reviews fetched successfully!',
      data: reviews,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const deleteOwnReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;
    const deleted = await deleteReviewByBuyer({
      reviewId: req.params.id,
      buyerId: user.id,
    });

    res.status(200).json({
      error: false,
      message: 'Review deleted successfully!',
      data: deleted,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const deleteSellerReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;
    const deleted = await deleteReviewBySeller(req.params.reviewId, user.id);

    res.status(200).json({
      error: false,
      message: 'Review removed successfully!',
      data: deleted,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateOwnReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;
    const updated = await updateReviewByBuyer(req.params.id, user.id, req.body);

    res.status(200).json({
      error: false,
      message: 'Review updated successfully!',
      data: updated,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

export {
  createReviewFromOrderController,
  getAllSellerReviewsController,
  getProductReviewsController,
  deleteOwnReviewController,
  deleteSellerReviewController,
  updateOwnReviewController,
};
