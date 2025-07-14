export interface ICategory {
  id: string;
  seller_id: string;
  category_name: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type CategoryAttributes = ICategory;

export type CategoryCreationAttributes = Partial<
  Pick<ICategory, 'id' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'>
> & Omit<ICategory, 'id' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export interface ICategoryCreate extends CategoryCreationAttributes {}

export interface ICategoryUpdate {
  id: string;
  category_name: string;
}

export interface ICategoryDelete {
  id: string;
}
