import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

interface SubCategoryAttributes {
  id: string;
  seller_id: string;
  category_id: string;
  sub_category_name: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface SubCategoryCreationAttributes
  extends Optional<
    SubCategoryAttributes,
    'id' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

class SubCategory
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>
  implements SubCategoryAttributes {
  declare id: string;
  declare seller_id: string;
  declare category_id: string;
  declare sub_category_name: string;
  declare is_active: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

SubCategory.init(
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
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sub_category_name: {
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
    tableName: 'sub_categories',
    freezeTableName: true, // optional but makes table name predictable
    timestamps: true,
    paranoid: true, // enables soft deletes
    underscored: true, // created_at instead of createdAt
  }
);

export default SubCategory;
