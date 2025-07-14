export interface IReview {
  id: string;
  order_id?: string | null;
  product_id?: string | null;
  seller_id?: string | null;
  buyer_id?: string | null;
  rating?: number | null;
  comment?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IReviewCreation
  extends Partial<Omit<IReview, 'id'>> {}

export interface ICreateReviewInput {
  order_id?: string;
  product_id?: string;
  seller_id?: string;
  buyer_id?: string;
  rating?: number;
  comment?: string;
}

export interface IUpdateReviewInput {
  reviewId: string;
  rating?: number;
  comment?: string;
}
