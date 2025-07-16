export interface ICategory {
  id: string;
  seller_id: string;
  category_name: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export type ICategoryCreate = Pick<ICategory, 'seller_id' | 'category_name'> &
  Partial<Pick<ICategory, 'is_active'>>;
  
export interface ICategoryUpdate {
  id: string;
  category_name: string;
}
export interface ICategoryDelete {
  id: string;
}
