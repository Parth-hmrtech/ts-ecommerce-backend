export interface IOrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  seller_id?: string | null;
  price: number | null;
  quantity: number | null;
  subtotal: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}


import { Optional } from 'sequelize';

export type ICreateOrderItem = Optional<
  IOrderItem,
  'id' | 'createdAt' | 'updatedAt'
>;
