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
  const authReq = req as AuthRequest;
  try {
    const createdProduct = await createProduct({ seller_id: authReq.user.id, ...authReq.body });
    res.status(200).json({
      error: false,
      message: 'Product created successfully!',
      data: createdProduct,
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const imageProductController = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;
  try {
    const { product_id } = authReq.body;
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
  } catch (error: any) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getProductController = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;
  try {
    const products = await getProduct(authReq.user);
    res.status(200).json({
      error: false,
      message: 'Products retrieved successfully!',
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
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
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
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
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const createWishlistController = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;
  try {
    const wishlist = await createWishlist({ buyer_id: authReq.user.id, ...authReq.body });
    res.status(200).json({
      error: false,
      message: 'Wishlist created successfully!',
      data: wishlist,
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getWishlistController = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;
  try {
    const wishlistItem = await getWishlist(authReq.user.id);
    res.status(200).json({
      error: false,
      message: 'Wishlist retrieved successfully!',
      data: wishlistItem,
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
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
