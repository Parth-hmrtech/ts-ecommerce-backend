import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface ReviewAttributes {
  id: string;
  order_id?: string | null;
  product_id?: string | null;
  seller_id?: string | null;
  buyer_id?: string | null;
  rating?: number | null;
  comment?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface ReviewCreationAttributes extends Optional<
  ReviewAttributes,
  'id' | 'order_id' | 'product_id' | 'seller_id' | 'buyer_id' | 'rating' | 'comment' | 'created_at' | 'updated_at'
> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: string;
  public order_id!: string | null;
  public product_id!: string | null;
  public seller_id!: string | null;
  public buyer_id!: string | null;
  public rating!: number | null;
  public comment!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
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
    tableName: 'reviews',
    timestamps: false,
    underscored: true,
  }
);

export default Review;
