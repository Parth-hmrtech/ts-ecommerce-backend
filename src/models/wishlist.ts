import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/dbConnect';

interface WishlistAttributes {
  id: string;
  buyer_id: string;
  product_id: string;
  added_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WishlistCreationAttributes extends Optional<
  WishlistAttributes,
  'id' | 'added_at' | 'createdAt' | 'updatedAt'
> {}

class Wishlist
  extends Model<WishlistAttributes, WishlistCreationAttributes>
  implements WishlistAttributes {
  declare id: string;
  declare buyer_id: string;
  declare product_id: string;
  declare added_at: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Wishlist.init(
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
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'wishlist',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['buyer_id', 'product_id'],
      },
    ],
  }
);

export default Wishlist;
