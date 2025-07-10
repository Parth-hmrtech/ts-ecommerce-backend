import { Request, Response, RequestHandler } from 'express';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  fetchAllCategory,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  fetchAllSubCategory,
  getSubCategoryByCategoryId
} from '../service/category.service';

// Custom Request interface for authenticated routes
interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

// ----- Category Controllers -----

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    const { user } = req as AuthRequest;
    const categories = await createCategory({ seller_id: user.id, ...req.body });

    return res.status(200).json({
      error: false,
      message: 'Category created successfully!',
      data: categories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getCategoryController: RequestHandler = async (req, res) => {
  try {
    const { user } = req as AuthRequest;
    console.log("hello");
    
    const categories = await getCategory({ seller_id: user.id });

    return res.status(200).json({
      error: false,
      message: 'Categories retrieved successfully!',
      data: categories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const updateCategoryController: RequestHandler = async (req, res) => {
  try {
    const category = await updateCategory({ ...req.params, ...req.body });

    return res.status(200).json({
      error: false,
      message: 'Category updated successfully!',
      data: category
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteCategoryController: RequestHandler = async (req, res) => {
  try {
    const category = await deleteCategory({ id: req.params.id });

    return res.status(200).json({
      error: false,
      message: 'Category deleted successfully!',
      data: category
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const fetchAllCategoryController: RequestHandler = async (_req, res) => {
  try {
    const categories = await fetchAllCategory();

    return res.status(200).json({
      error: false,
      message: 'All categories retrieved successfully!',
      data: categories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

// ----- SubCategory Controllers -----

export const createSubCategoryController: RequestHandler = async (req, res) => {
  try {
    const { user } = req as AuthRequest;
    const subCategory = await createSubCategory({ seller_id: user.id, ...req.body });

    return res.status(200).json({
      error: false,
      message: 'Subcategory created successfully',
      data: subCategory
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getSubCategoryController: RequestHandler = async (req, res) => {
  try {
    const { user } = req as AuthRequest;
    const subCategories = await getSubCategory({ id: user.id });

    return res.status(200).json({
      error: false,
      message: 'Subcategories retrieved successfully',
      data: subCategories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getSubCategoryByCategoryIdController: RequestHandler = async (req, res) => {
  try {
    const subCategories = await getSubCategoryByCategoryId({ category_id: req.params.categoryId });

    return res.status(200).json({
      error: false,
      message: 'Subcategories by category retrieved successfully',
      data: subCategories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const updateSubCategoryController: RequestHandler = async (req, res) => {
  try {
    const updatedSubCategory = await updateSubCategory({ ...req.params, ...req.body });

    return res.status(200).json({
      error: false,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteSubCategoryController: RequestHandler = async (req, res) => {
  try {
    const deletedSubCategory = await deleteSubCategory({ id: req.params.id });

    return res.status(200).json({
      error: false,
      message: 'Subcategory deleted successfully',
      data: deletedSubCategory
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const fetchAllSubCategoryController: RequestHandler = async (_req, res) => {
  try {
    const allSubCategories = await fetchAllSubCategory();

    return res.status(200).json({
      error: false,
      message: 'All subcategories retrieved successfully',
      data: allSubCategories
    });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
