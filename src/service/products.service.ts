import Product from '@/models/products';
import Category from '@/models/categories';
import SubCategory from '@/models/subCategories';
import Wishlist from '@/models/wishlist';

import {
  ICreateProduct,
  IUpdateProduct,
  IProduct,
  ImageUploadInput,
} from '@/types/product.types';

import {
  IWishlist,
  IWishlistCreate,
} from '@/types/wishlist.types';



const createProduct = async ({ seller_id, ...productBody }: ICreateProduct): Promise<IProduct> => {

  const createdProduct = await Product.create({
    seller_id,
    ...productBody,
  });

  return createdProduct;
};

const uploadProductImage = async ({ product_id, image_urls, }: ImageUploadInput): Promise<number> => {

  if (!Array.isArray(image_urls)) {
    throw new Error('image_urls must be an array');
  }

  const formattedImages = image_urls.map((url) => ({ image_url: url }));

  const [affectedRows] = await Product.update(
    { image_url: formattedImages },
    { where: { id: product_id } }
  );

  return affectedRows;
};

const getProduct = async (user: { id: string }): Promise<IProduct[]> => {

  const products = await Product.findAll({
    where: { seller_id: user.id },
    include: [
      { model: Category, as: 'category' },
      { model: SubCategory, as: 'subCategory' },
    ],
  });

  return products;
};

const updateProduct = async ({ productId, ...updateData }: IUpdateProduct & { productId: string }): Promise<boolean> => {

  const [updatedCount] = await Product.update(updateData, {
    where: { id: productId },
  });

  return updatedCount > 0;
};

const deleteProduct = async (productId: string): Promise<boolean> => {

  const deleted = await Product.destroy({ where: { id: productId } });

  return deleted > 0;
};

const fatchAllProducts = async (): Promise<IProduct[]> => {

  const products = await Product.findAll({

    include: [
      {
        model: Category,
        as: 'category',
        attributes: { exclude: ['deleted_at'] },
      },
      {
        model: SubCategory,
        as: 'subCategory',
        attributes: { exclude: ['deleted_at'] },
      },
    ],

  });

  return products;
};

const fetchProductById = async (id: string): Promise<IProduct | null> => {

  const product = await Product.findOne({

    where: { id },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: { exclude: ['deleted_at'] },
      },
      {
        model: SubCategory,
        as: 'subCategory',
        attributes: { exclude: ['deleted_at'] },
      },
    ],

  });

  return product;
};


const createWishlist = async ({ buyer_id, product_id, }: IWishlistCreate): Promise<IWishlist> => {

  const [wishlistItem] = await Wishlist.findOrCreate({
    where: { buyer_id, product_id },
    defaults: { buyer_id, product_id },
  });

  return wishlistItem;
};

const getWishlist = async (userId: string): Promise<IWishlist[]> => {

  const items = await Wishlist.findAll({
    where: { buyer_id: userId },
  });

  return items;
};

const deleteWishlist = async (productId: string): Promise<boolean> => {

  const deleted = await Wishlist.destroy({
    where: { product_id: productId },
  });

  return deleted > 0;
};

export {
  createProduct,
  uploadProductImage,
  getProduct,
  updateProduct,
  deleteProduct,
  fatchAllProducts,
  fetchProductById,
  createWishlist,
  getWishlist,
  deleteWishlist,
};
