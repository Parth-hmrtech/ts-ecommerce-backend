import Category from '../models/categories';
import SubCategory from '../models/subCategories';

import {
  ICategoryCreate,
  ICategoryUpdate,
} from '../types/category.types';

import {
  ISubCategoryCreate,
  ISubCategoryUpdate,
  ISubCategoryDelete,
} from '../types/subCategory.types';

const createCategory = async ( { seller_id, category_name }: ICategoryCreate): Promise<Category> => {
  return await Category.create({ seller_id, category_name });
};

const getCategory = async ( { seller_id }: { seller_id: string }): Promise<Category[]> => {
  return await Category.findAll({ where: { seller_id } });
};

const updateCategory = async ( { id, category_name }: ICategoryUpdate): Promise<boolean> => {
  
  const [updatedCount] = await Category.update(
    { category_name },
    { where: { id } }
  );
  
  return updatedCount > 0;
};

const deleteCategory = async (id: string): Promise<number> => {
  return await Category.destroy({ where: { id } });
};

const fetchAllCategory = async (): Promise<Category[]> => {
  return await Category.findAll();
};

const createSubCategory = async ( { seller_id, ...subCategoryBody }: ISubCategoryCreate): Promise<SubCategory> => {
  return await SubCategory.create({ seller_id, ...subCategoryBody });
};

const getSubCategory = async (seller: { id: string }): Promise<SubCategory[]> => {
  return await SubCategory.findAll({ where: { seller_id: seller.id } });
};

const updateSubCategory = async ( { id, sub_category_name }: ISubCategoryUpdate): Promise<boolean> => {
  
  const [updatedCount] = await SubCategory.update(
    { sub_category_name },
    { where: { id } }
  );
  
  return updatedCount > 0;
};

const deleteSubCategory = async ({ id }: ISubCategoryDelete): Promise<number> => {
  return await SubCategory.destroy({ where: { id } });
};

const fetchAllSubCategory = async (): Promise<SubCategory[]> => {
  return await SubCategory.findAll();
};

const getSubCategoryByCategoryId = async ( { category_id }: { category_id: string }): Promise<SubCategory[]> => {
  return await SubCategory.findAll({ where: { category_id } });
};

export {
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
  getSubCategoryByCategoryId,
};
