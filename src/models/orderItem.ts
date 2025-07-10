import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface OrderItemAttributes {
  id: string;
  order_id?: string | null;
  product_id?: string | null;
  seller_id?: string | null;
  price?: number | null;
  quantity?: number | null;
  subtotal?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  'id' | 'order_id' | 'product_id' | 'seller_id' | 'price' | 'quantity' | 'subtotal' | 'createdAt' | 'updatedAt'
> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: string;
  public order_id!: string | null;
  public product_id!: string | null;
  public seller_id!: string | null;
  public price!: number | null;
  public quantity!: number | null;
  public subtotal!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init({
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
}, {
  sequelize,
  tableName: 'order_items',
  timestamps: true,
  underscored: true,
});

export default OrderItem;
