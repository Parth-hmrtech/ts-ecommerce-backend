import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';
import {
  ICategory,
  ICategoryCreate,
} from '../types/category.types';

class Category
  extends Model<ICategory, ICategoryCreate>
  implements ICategory
{
  declare id: string;
  declare seller_id: string;
  declare category_name: string;
  declare is_active: boolean;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
  declare readonly deletedAt?: Date | null;
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
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,     
    paranoid: true,       
    underscored: true,    
  }
);

export default Category;
