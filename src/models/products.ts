import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import Category from './categories'; 
import SubCategory from './subCategories'; 

interface ProductAttributes {
  id: string;
  seller_id?: string | null;
  category_id?: string | null;
  subcategory_id?: string | null;
  product_name?: string | null;
  description?: string | null;
  price?: number | null;
  quantity?: number | null;
  image_url?: any; 
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'seller_id' | 'category_id' | 'subcategory_id' | 'product_name' | 'description' | 'price' | 'quantity' | 'image_url' | 'is_active' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string;
  public seller_id!: string | null;
  public category_id!: string | null;
  public subcategory_id!: string | null;
  public product_name!: string | null;
  public description!: string | null;
  public price!: number | null;
  public quantity!: number | null;
  public image_url!: any;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
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
