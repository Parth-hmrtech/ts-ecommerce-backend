import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import { IPayment } from '../types/payment.types';

type IPaymentCreation = Optional<
  IPayment,
  | 'id'
  | 'order_id'
  | 'buyer_id'
  | 'seller_id'
  | 'amount'
  | 'payment_method'
  | 'payment_status'
  | 'transaction_id'
  | 'paid_at'
  | 'created_at'
  | 'updated_at'
>;

class Payment extends Model<IPayment, IPaymentCreation> implements IPayment {
  declare id: string;
  declare order_id: string | null;
  declare buyer_id: string | null;
  declare seller_id: string | null;
  declare amount: number | null;
  declare payment_method: string | null;
  declare payment_status: string | null;
  declare transaction_id: string | null;
  declare paid_at: Date | null;

  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'pending',
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // 👇 add these explicitly to override default field names
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    underscored: true,
  }
);

export default Payment;
