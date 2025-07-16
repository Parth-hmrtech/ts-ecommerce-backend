export interface IProduct {
  id: string;
  seller_id?: string | null;
  category_id?: string | null;
  subcategory_id?: string | null;
  product_name?: string | null;
  description?: string | null;
  price?: number | null;
  quantity?: number | null;
  image_url?: any; 
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export type ICreateProduct = Partial<Pick<IProduct, 'id' | 'seller_id' | 'category_id' | 'subcategory_id' | 'product_name' | 'description' | 'price' | 'quantity' | 'image_url' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'>> & Omit<IProduct, 'id' | 'seller_id' | 'category_id' | 'subcategory_id' | 'product_name' | 'description' | 'price' | 'quantity' | 'image_url' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'>;


export interface IUpdateProduct {
  id: string;
  product_name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image_url?: any;
  is_active?: boolean;
}

export interface IDeleteProduct {
  id: string;
}

export interface ImageUploadInput {
  product_id: string;
  image_urls: string[];
}
