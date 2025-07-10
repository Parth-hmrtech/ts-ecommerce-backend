import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface CartAttributes {
  id: string;
  buyer_id: string;
  product_id: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: string;
  public buyer_id!: string;
  public product_id!: string;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  buyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  sequelize,
  tableName: 'cart_item',
  timestamps: true,
  underscored: true,
});

export default Cart;
