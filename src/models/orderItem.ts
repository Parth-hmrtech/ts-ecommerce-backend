
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';
import { IOrderItem, ICreateOrderItem } from '../types/orderItem.types';

class OrderItem extends Model<IOrderItem, ICreateOrderItem> implements IOrderItem {
  declare id: string;

  declare order_id: string | null;
  declare product_id: string | null;
  declare seller_id: string | null;

  declare price: number | null;
  declare quantity: number | null;
  declare subtotal: number | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}


OrderItem.init(
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
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'order_item',
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
  }
);

export default OrderItem;
