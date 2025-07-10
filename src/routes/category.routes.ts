import express from 'express';
import { userAuthMiddleware } from '../middleware/auth.middleware.ts';
import {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fetchAllCategoryController,
  createSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
  fetchAllSubCategoryController,
  getSubCategoryByCategoryIdController
} from '../controllers/category.controller.ts';

const router = express.Router();

router.get('/seller/categories', userAuthMiddleware, getCategoryController);
router.post('/seller/categories', userAuthMiddleware, createCategoryController);
router.put('/seller/categories/:id', userAuthMiddleware, updateCategoryController);
router.delete('/seller/categories/:id', userAuthMiddleware, deleteCategoryController);
router.get('/buyer/categories', fetchAllCategoryController);

router.get('/seller/subcategories', userAuthMiddleware, getSubCategoryController);
router.get('/seller/subcategories/:categoryId', userAuthMiddleware, getSubCategoryByCategoryIdController);
router.post('/seller/subcategories', userAuthMiddleware, createSubCategoryController);
router.put('/seller/subcategories/:id', userAuthMiddleware, updateSubCategoryController);
router.delete('/seller/subcategories/:id', userAuthMiddleware, deleteSubCategoryController);
router.get('/buyer/subcategories', fetchAllSubCategoryController);

export default router;
