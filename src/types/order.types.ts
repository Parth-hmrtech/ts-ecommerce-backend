
export interface IOrder {
  id: string;
  seller_id?: string | null;
  buyer_id?: string | null;
  order_date?: Date;
  status?: string;
  total_amount?: number | null;
  delivery_address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICreateOrder = Omit<IOrder, 'id' | 'createdAt' | 'updatedAt'>;
