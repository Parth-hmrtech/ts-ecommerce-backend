import { Request, Response } from 'express';
import {
  createReview,
  getSellerReviews,
  getReviewsByProduct,
  deleteReviewByBuyer,
  deleteReviewBySeller,
  updateReviewByBuyer,
} from '../service/review.service';

interface AuthRequest extends Request {
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
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to create review',
    });
  }
};

const getAllSellerReviewsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await getSellerReviews({ seller_id: (req as AuthRequest).user.id });

    res.status(200).json({
      error: false,
      message: 'Seller reviews fetched successfully!',
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch seller reviews',
    });
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
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch product reviews',
    });
  }
};

const deleteOwnReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await deleteReviewByBuyer({
      reviewId: req.params.id,
      buyerId: (req as AuthRequest).user.id,
    });

    res.status(200).json({
      error: false,
      message: 'Review deleted successfully!',
      data: deleted,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to delete review',
    });
  }
};

const deleteSellerReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await deleteReviewBySeller(
      req.params.reviewId,
      (req as AuthRequest).user.id
    );

    res.status(200).json({
      error: false,
      message: 'Review removed successfully!',
      data: deleted,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to remove review',
    });
  }
};

const updateOwnReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await updateReviewByBuyer(
      req.params.id,
      (req as AuthRequest).user.id,
      req.body
    );

    res.status(200).json({
      error: false,
      message: 'Review updated successfully!',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to update review',
    });
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
