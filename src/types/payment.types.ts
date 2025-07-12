export interface IPayment {
  id: string;
  order_id?: string | null;
  buyer_id?: string | null;
  seller_id?: string | null;
  amount?: number | null;
  payment_method?: string | null;
  payment_status?: string | null;
  transaction_id?: string | null;
  paid_at?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IPaymentCreation = Omit<IPayment, 'id' | 'createdAt' | 'updatedAt'>;
