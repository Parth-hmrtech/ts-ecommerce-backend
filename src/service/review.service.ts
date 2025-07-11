import Review from '../models/review';
import {
  IReview,
  ICreateReviewInput,
  IUpdateReviewInput
} from '../types/review.types';

const createReview = async (reviewData: ICreateReviewInput): Promise<IReview> => {
  return await Review.create(reviewData);
};

const getSellerReviews = async ({ seller_id }: { seller_id: string }): Promise<IReview[]> => {
  return await Review.findAll({
    where: { seller_id }
  });
};

const getReviewsByProduct = async (productId: string): Promise<IReview[]> => {
  return await Review.findAll({
    where: { product_id: productId }
  });
};

const deleteReviewByBuyer = async ({
  reviewId,
  buyerId
}: {
  reviewId: string;
  buyerId: string;
}): Promise<boolean> => {
  const deleted = await Review.destroy({
    where: {
      id: reviewId,
      buyer_id: buyerId
    }
  });
  return deleted > 0;
};

const deleteReviewBySeller = async (
  reviewId: string,
  sellerId: string
): Promise<boolean> => {
  const deleted = await Review.destroy({
    where: {
      id: reviewId,
      seller_id: sellerId
    }
  });
  return deleted > 0;
};

const updateReviewByBuyer = async (
  reviewId: string,
  buyerId: string,
  updateData: IUpdateReviewInput
): Promise<boolean> => {
  const [updatedCount] = await Review.update(updateData, {
    where: {
      id: reviewId,
      buyer_id: buyerId
    }
  });
  return updatedCount > 0;
};

export {
  createReview,
  getSellerReviews,
  getReviewsByProduct,
  deleteReviewByBuyer,
  deleteReviewBySeller,
  updateReviewByBuyer
};
