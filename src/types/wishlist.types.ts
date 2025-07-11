export interface IWishlist {
  id: string;
  buyer_id: string;
  product_id: string;
  added_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IWishlistCreate = Omit<
  IWishlist,
  'id' | 'added_at' | 'createdAt' | 'updatedAt'
>;