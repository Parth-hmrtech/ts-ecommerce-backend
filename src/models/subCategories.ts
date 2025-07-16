import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/dbConnect';
import { ISubCategory, ISubCategoryCreate } from '@/types/subCategory.types';

class SubCategory
  extends Model<ISubCategory, ISubCategoryCreate>
  implements ISubCategory
{
  declare id: string;
  declare seller_id: string;
  declare category_id: string;
  declare sub_category_name: string;
  declare is_active: boolean;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
  declare readonly deletedAt?: Date | null;
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
    modelName: 'SubCategory',
    tableName: 'sub_categories',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default SubCategory;
