import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import { IReview } from '../types/review.types';

interface ReviewCreationAttributes extends Optional<
  IReview,
  'id' | 'order_id' | 'product_id' | 'seller_id' | 'buyer_id' | 'rating' | 'comment'
> {}

class Review extends Model<IReview, ReviewCreationAttributes> implements IReview {
  declare id: string;
  declare order_id: string | null;
  declare product_id: string | null;
  declare seller_id: string | null;
  declare buyer_id: string | null;
  declare rating: number | null;
  declare comment: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Review.init(
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
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'reviews',
    timestamps: true,
    underscored: true,
  }
);

export default Review;
