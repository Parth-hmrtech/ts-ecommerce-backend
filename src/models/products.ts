import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/dbConnect';
import Category from '@/models/categories';
import SubCategory from '@/models/subCategories';
import { IProduct, ICreateProduct } from '@/types/product.types';

interface IProductCreation extends Optional<IProduct, keyof ICreateProduct> {}

class Product extends Model<IProduct, IProductCreation> implements IProduct {
  declare id: string;
  declare seller_id: string | null;
  declare category_id: string | null;
  declare subcategory_id: string | null;
  declare product_name: string | null;
  declare description: string | null;
  declare price: number;
  declare quantity: number | null;
  declare image_url: any;
  declare is_active: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    subcategory_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { min: 0 },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    image_url: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

Product.belongsTo(SubCategory, {
  foreignKey: 'subcategory_id',
  as: 'subCategory',
});

export default Product;
