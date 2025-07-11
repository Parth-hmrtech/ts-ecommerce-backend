import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';
import { ICart, ICartCreation } from '../types/cart.types';

class Cart extends Model<ICart, ICartCreation> implements ICart {
  public id!: string;
  public buyer_id!: string;
  public product_id!: string;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart_item',
    timestamps: true,
    underscored: true,
  }
);

export default Cart;
