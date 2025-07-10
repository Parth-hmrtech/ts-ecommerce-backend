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
  public id!: string;
  public seller_id!: string;
  public category_id!: string;
  public sub_category_name!: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
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
    freezeTableName: true, // optional but recommended
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default SubCategory;
