import { Optional } from 'sequelize';

export interface ICart {
  id: string;
  buyer_id: string;
  product_id: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICartCreation = Optional<ICart, 'id' | 'createdAt' | 'updatedAt'>;

export interface ICreateCartInput {
  buyer_id: string;
  product_id: string;
  quantity: number;
}

export interface IGetCartInput {
  id: string; 
}


export interface IUpdateCartInput {
  cartId: string;
  quantity: number;
}
