
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';
import orderItems from './orderItem';
import { IOrder, ICreateOrder } from '../types/order.types';

class Order extends Model<IOrder, ICreateOrder> implements IOrder {
  declare id: string;
  declare buyer_id: string | null;
  declare seller_id: string | null;
  declare order_date: Date;
  declare status: string;
  declare total_amount: number | null;
  declare delivery_address: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}


Order.init(
  {
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
  },
  {
    sequelize,
    modelName: 'order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);

// Associations
Order.hasMany(orderItems, { foreignKey: 'order_id' });
orderItems.belongsTo(Order, { foreignKey: 'order_id' });

export default Order;
