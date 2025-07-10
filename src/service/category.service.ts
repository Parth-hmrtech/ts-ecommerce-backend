import { Op } from 'sequelize';
import categories from '../models/categories';
import subCategories from '../models/subCategories';


interface CreateCategoryInput {
  seller_id: string;
  category_name: string;
}

interface GetCategoryInput {
  seller_id: string;
}

interface UpdateCategoryInput {
  id: string;
  category_name: string;
}

interface DeleteCategoryInput {
  id: string;
}

interface CreateSubCategoryInput {
  seller_id: string;
  category_id: string;
  sub_category_name: string;
}

interface GetSubCategoryInput {
  id: string;
}

interface UpdateSubCategoryInput {
  id: string;
  sub_category_name: string;
}

interface DeleteSubCategoryInput {
  id: string;
}

interface SubCategoryByCategoryIdInput {
  category_id: string;
}


const createCategory = async ({
  seller_id,
  category_name,
}: CreateCategoryInput) => {
  return await categories.create({ seller_id, category_name });
};

const getCategory = async ({ seller_id }: GetCategoryInput) => {
  return await categories.findAll({ where: { seller_id } });
};

const updateCategory = async ({ id, category_name }: UpdateCategoryInput) => {
  const [affectedRows] = await categories.update(
    { category_name },
    { where: { id } }
  );
  return affectedRows > 0;
};

const deleteCategory = async ({ id }: DeleteCategoryInput) => {
  return await categories.destroy({ where: { id } });
};

const fetchAllCategory = async () => {
  return await categories.findAll();
};


const createSubCategory = async ({
  seller_id,
  category_id,
  sub_category_name,
}: CreateSubCategoryInput) => {
  return await subCategories.create({ seller_id, category_id, sub_category_name });
};

const getSubCategory = async ({ id }: GetSubCategoryInput) => {
  return await subCategories.findAll({ where: { seller_id: id } });
};

const updateSubCategory = async ({
  id,
  sub_category_name,
}: UpdateSubCategoryInput) => {
  const [affectedRows] = await subCategories.update(
    { sub_category_name },
    { where: { id } }
  );
  return affectedRows > 0;
};

const deleteSubCategory = async ({ id }: DeleteSubCategoryInput) => {
  return await subCategories.destroy({ where: { id } });
};

const fetchAllSubCategory = async () => {
  return await subCategories.findAll();
};

const getSubCategoryByCategoryId = async ({
  category_id,
}: SubCategoryByCategoryIdInput) => {
  return await subCategories.findAll({ where: { category_id } });
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
