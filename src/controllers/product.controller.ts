import { Request, Response } from 'express';
import {
  createProduct,
  uploadProductImage,
  getProduct,
  updateProduct,
  deleteProduct,
  fatchAllProducts,
  createWishlist,
  deleteWishlist,
  getWishlist,
  fetchProductById
} from '../service/products.service';
import { uploadFile } from '../utils/uploadImage';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const createdProduct = await createProduct({ seller_id: user.id, ...req.body });

    res.status(200).json({
      error: false,
      message: 'Product created successfully!',
      data: createdProduct,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const imageProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const { product_id } = req.body;
    const image_urls: any[] = [];

    for (const file of req.files as Express.Multer.File[]) {
      const result = await uploadFile(file.path);
      image_urls.push(result);
    }

    const updateResult = await uploadProductImage({ product_id, image_urls });

    res.status(200).json({
      message: 'Images uploaded successfully',
      updated: updateResult,
      data: image_urls,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const products = await getProduct(user);
    res.status(200).json({
      error: false,
      message: 'Products retrieved successfully!',
      data: products,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const product = await fetchProductById(productId);

    if (!product) {
      res.status(404).json({
        error: true,
        message: 'Product not found!',
      });
      return;
    }

    res.status(200).json({
      error: false,
      message: 'Product retrieved successfully!',
      data: product,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await updateProduct({ productId: req.params.id, ...req.body });
    res.status(200).json({
      error: false,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    res.status(200).json({
      error: false,
      message: 'Product deleted successfully!',
      data: deletedProduct,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const fatchAllProductController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await fatchAllProducts();
    res.status(200).json({
      error: false,
      message: 'All products retrieved successfully!',
      data: products,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const createWishlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const wishlist = await createWishlist({ buyer_id: user.id, ...req.body });
    res.status(200).json({
      error: false,
      message: 'Wishlist created successfully!',
      data: wishlist,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const getWishlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const wishlistItem = await getWishlist(user.id);
    res.status(200).json({
      error: false,
      message: 'Wishlist retrieved successfully!',
      data: wishlistItem,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const deleteWishlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const isDeleted = await deleteWishlist(req.params.productId);
    res.status(200).json({
      error: false,
      message: 'Wishlist deleted successfully!',
      data: isDeleted,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

export {
  createProductController,
  imageProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  fatchAllProductController,
  createWishlistController,
  getWishlistController,
  deleteWishlistController,
};
