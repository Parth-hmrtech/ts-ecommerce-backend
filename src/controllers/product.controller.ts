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
import fs from 'fs/promises';
import path from 'path';
import { uploadFile } from '../utils/uploadImage';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}


export const createProductController = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const createdProduct = await createProduct({ seller_id: authReq.user.id, ...authReq.body });

    return res.status(200).json({
      error: false,
      message: 'Product Created successfully!',
      data: createdProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const imageProductController = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { product_id } = authReq.body;
    const image_urls: any[] = [];

    for (const file of req.files as Express.Multer.File[]) {
      const result = await uploadFile(file.path);
      image_urls.push(result);
    }

    const updateResult = await uploadProductImage({ product_id, image_urls });

    return res.status(200).json({
      message: 'Images uploaded successfully',
      updated: updateResult,
      data: image_urls,
    });
  } catch (error: any) {
    console.error('Error in controller:', error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getProductController = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const products = await getProduct(authReq.user);
    return res.status(200).json({
      error: false,
      message: 'Product retrieved successfully!',
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await fetchProductById(productId);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found!',
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Product retrieved successfully!',
      data: product,
    });
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await updateProduct({ productId: req.params.id, ...req.body });
    return res.status(200).json({
      error: false,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    return res.status(200).json({
      error: false,
      message: 'Product deleted successfully!',
      data: deletedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const fatchAllProductController = async (_req: Request, res: Response) => {
  try {
    const products = await fatchAllProducts();
    return res.status(200).json({
      error: false,
      message: 'All products retrieved successfully!',
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const createWishlistController = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const wishlist = await createWishlist({ buyer_id: authReq.user.id, ...authReq.body });
    return res.status(200).json({
      error: false,
      message: 'Wishlist created successfully!',
      data: wishlist,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getWishlistController = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const wishlistItem = await getWishlist(authReq.user.id);
    return res.status(200).json({
      error: false,
      message: 'Wishlist retrieved successfully!',
      data: wishlistItem,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteWishlistController = async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteWishlist(req.params.productId);
    return res.status(200).json({
      error: false,
      message: 'Wishlist deleted successfully!',
      data: isDeleted,
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
