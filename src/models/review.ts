// src/models/review.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import { IReview } from '../types/review.types';

type ReviewCreationAttributes = Partial<Omit<IReview, 'id'>>;

class Review extends Model<IReview, ReviewCreationAttributes> implements IReview {
  declare id: string;
  declare order_id: string | null;
  declare product_id: string | null;
  declare seller_id: string | null;
  declare buyer_id: string | null;
  declare rating: number | null;
  declare comment: string | null;
  declare created_at: Date | undefined;
  declare updated_at: Date | undefined;
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false, // ⛔️ disables Sequelize automatic createdAt/updatedAt
  }
);

export default Review;
