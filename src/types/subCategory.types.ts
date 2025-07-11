export interface ISubCategory {
  id: string;
  seller_id: string;
  category_id: string;
  sub_category_name: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type ISubCategoryCreate = {
  seller_id: string;
  category_id: string;
  sub_category_name: string;
} & Partial<Pick<ISubCategory, 'id' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;

export interface ISubCategoryUpdate {
  id: string;
  sub_category_name: string;
}

export interface ISubCategoryDelete {
  id: string;
}
