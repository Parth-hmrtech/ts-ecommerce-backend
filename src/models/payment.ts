import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface PaymentAttributes {
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

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'order_id' | 'buyer_id' | 'seller_id' | 'amount' | 'payment_method' | 'payment_status' | 'transaction_id' | 'paid_at' | 'createdAt' | 'updatedAt'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: string;
  public order_id!: string | null;
  public buyer_id!: string | null;
  public seller_id!: string | null;
  public amount!: number | null;
  public payment_method!: string | null;
  public payment_status!: string | null;
  public transaction_id!: string | null;
  public paid_at!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
    underscored: true,
  }
);

export default Payment;
