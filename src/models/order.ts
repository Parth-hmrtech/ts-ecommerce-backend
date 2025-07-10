import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import OrderItem from './orderItem'; 

interface OrderAttributes {
  id: string;
  seller_id?: string | null;
  buyer_id?: string | null;
  order_date?: Date;
  status: string;
  total_amount?: number;
  delivery_address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  'id' | 'seller_id' | 'buyer_id' | 'order_date' | 'total_amount' | 'delivery_address' | 'createdAt' | 'updatedAt'
> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public seller_id!: string | null;
  public buyer_id!: string | null;
  public order_date!: Date;
  public status!: string;
  public total_amount!: number;
  public delivery_address!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    Order.hasMany(OrderItem, { foreignKey: 'order_id' });
  }
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seller_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  buyer_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  total_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'orders',
  timestamps: true,
  underscored: true,
});

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

export default Order;
