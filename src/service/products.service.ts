import product from '../models/products';
import categories from '../models/categories';
import subCategories from '../models/subCategories';
import wishlist from '../models/wishlist';

// ------------------ Type Definitions ------------------

interface ProductInput {
  seller_id: string;
  product_name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category_id?: string;
  subcategory_id?: string;
  image_url?: any;
  is_active?: boolean;
}

interface ImageUploadInput {
  product_id: string;
  image_urls: string[];
}

interface UpdateProductInput extends Partial<ProductInput> {
  productId: string;
}

interface WishlistInput {
  buyer_id: string;
  product_id: string;
}

// ------------------ Product Functions ------------------

const createProduct = async ({ seller_id, ...productBody }: ProductInput) => {
  const createdProduct = await product.create({
    seller_id,
    ...productBody,
  });
  return createdProduct;
};

const uploadProductImage = async ({ product_id, image_urls }: ImageUploadInput) => {
  if (!Array.isArray(image_urls)) {
    throw new Error('image_urls must be an array');
  }

  const formattedImages = image_urls.map((url) => ({ image_url: url }));

  const [affectedRows] = await product.update(
    { image_url: formattedImages },
    { where: { id: product_id } }
  );

  return affectedRows;
};

const getProduct = async (user: { id: string }) => {
  return await product.findAll({
    where: { seller_id: user.id },
    include: [
      { model: categories, as: 'category' },
      { model: subCategories, as: 'subCategory' },
    ],
  });
};

const updateProduct = async ({ productId, ...updateProductRecords }: UpdateProductInput) => {
  const [updatedCount] = await product.update(
    { ...updateProductRecords },
    { where: { id: productId } }
  );

  return updatedCount > 0;
};

const deleteProduct = async (productId: string) => {
  const deleted = await product.destroy({ where: { id: productId } });
  return deleted > 0;
};

const fatchAllProducts = async () => {
  return await product.findAll({
    include: [
      {
        model: categories,
        as: 'category',
        attributes: { exclude: ['deleted_at'] },
      },
      {
        model: subCategories,
        as: 'subCategory',
        attributes: { exclude: ['deleted_at'] },
      },
    ],
  });
};

const fetchProductById = async (id: string) => {
  return await product.findOne({
    where: { id },
    include: [
      {
        model: categories,
        as: 'category',
        attributes: { exclude: ['deleted_at'] },
      },
      {
        model: subCategories,
        as: 'subCategory',
        attributes: { exclude: ['deleted_at'] },
      },
    ],
  });
};

// ------------------ Wishlist Functions ------------------

const createWishlist = async ({ buyer_id, product_id }: WishlistInput) => {
  const [wishlistItem, created] = await wishlist.findOrCreate({
    where: { buyer_id, product_id },
    defaults: { buyer_id, product_id },
  });

  return wishlistItem;
};

const getWishlist = async (userId: string) => {
  return await wishlist.findAll({
    where: { buyer_id: userId },
  });
};

const deleteWishlist = async (productId: string) => {
  const deleted = await wishlist.destroy({
    where: { product_id: productId },
  });
  return deleted > 0;
};

// ------------------ Exports ------------------

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
