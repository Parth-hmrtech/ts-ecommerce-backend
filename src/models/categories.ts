import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface CategoryAttributes {
  id: string;
  seller_id: string;
  category_name: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface CategoryCreationAttributes
  extends Optional<
    CategoryAttributes,
    'id' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: string;
  public seller_id!: string;
  public category_name!: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Category;
