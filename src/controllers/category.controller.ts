import { Request, Response } from 'express';
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

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}


const createCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const categories = await createCategory({ seller_id: user.id, ...req.body });

    res.status(200).json({
      error: false,
      message: 'Category created successfully!',
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const categories = await getCategory({ seller_id: user.id });

    res.status(200).json({
      error: false,
      message: 'Categories retrieved successfully!',
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await updateCategory({ ...req.params, ...req.body });

    res.status(200).json({
      error: false,
      message: 'Category updated successfully!',
      data: category
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await deleteCategory(req.params.id);

    if (deleted === 0) {
      res.status(404).json({
        error: true,
        message: 'Category not found!',
      });
      return;
    }

    res.status(200).json({
      error: false,
      message: 'Category deleted successfully!',
      data: deleted,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message || 'Internal server error',
    });
  }
};

const fetchAllCategoryController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await fetchAllCategory();

    res.status(200).json({
      error: false,
      message: 'All categories retrieved successfully!',
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};


const createSubCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const subCategory = await createSubCategory({ seller_id: user.id, ...req.body });

    res.status(200).json({
      error: false,
      message: 'Subcategory created successfully',
      data: subCategory
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getSubCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    const subCategories = await getSubCategory({ id: user.id });

    res.status(200).json({
      error: false,
      message: 'Subcategories retrieved successfully',
      data: subCategories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getSubCategoryByCategoryIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const subCategories = await getSubCategoryByCategoryId({ category_id: req.params.categoryId });

    res.status(200).json({
      error: false,
      message: 'Subcategories by category retrieved successfully',
      data: subCategories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateSubCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSubCategory = await updateSubCategory({ ...req.params, ...req.body });

    res.status(200).json({
      error: false,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteSubCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSubCategory = await deleteSubCategory({ id: req.params.id });

    res.status(200).json({
      error: false,
      message: 'Subcategory deleted successfully',
      data: deletedSubCategory
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const fetchAllSubCategoryController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allSubCategories = await fetchAllSubCategory();

    res.status(200).json({
      error: false,
      message: 'All subcategories retrieved successfully',
      data: allSubCategories
    });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};


export {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fetchAllCategoryController,
  createSubCategoryController,
  getSubCategoryController,
  getSubCategoryByCategoryIdController,
  updateSubCategoryController,
  deleteSubCategoryController,
  fetchAllSubCategoryController
};
