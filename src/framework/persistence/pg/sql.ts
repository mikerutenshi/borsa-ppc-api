import { join, resolve } from 'path';
import pgPromise, { QueryFile } from 'pg-promise';

const sql = (file: string): QueryFile => {
  const fullPath = join(resolve('./sql'), file);
  return new pgPromise.QueryFile(fullPath, { minify: true });
};

const RoleSql = {
  create: sql('role/create.sql'),
  read: sql('role/read.sql'),
  update: sql('role/update.sql'),
  delete: sql('role/delete.sql'),
  clear: sql('role/clear.sql'),
};

const UserSql = {
  create: sql('user/create.sql'),
  read: sql('user/read.sql'),
  update: sql('user/update.sql'),
  delete: sql('user/delete.sql'),
  clear: sql('user/clear.sql'),
  createAuth: sql('user/create-auth.sql'),
};

const ProductCategorySql = {
  create: sql('product-category/create.sql'),
  read: sql('product-category/read.sql'),
  update: sql('product-category/update.sql'),
  delete: sql('product-category/delete.sql'),
  clear: sql('product-category/clear.sql'),
};

const ProductCategoryTypeSql = {
  create: sql('product-category-type/create.sql'),
  read: sql('product-category-type/read.sql'),
  update: sql('product-category-type/update.sql'),
  delete: sql('product-category-type/delete.sql'),
  clear: sql('product-category-type/clear.sql'),
};

const TypeSql = {
  create: sql('type/create.sql'),
  read: sql('type/read.sql'),
  update: sql('type/update.sql'),
  delete: sql('type/delete.sql'),
  clear: sql('type/clear.sql'),
};

const ProductGroupSql = {
  create: sql('product-group/create.sql'),
  read: sql('product-group/read.sql'),
  update: sql('product-group/update.sql'),
  delete: sql('product-group/delete.sql'),
  clear: sql('product-group/clear.sql'),
};

const ProductSql = {
  create: sql('product/create.sql'),
  read: sql('product/read.sql'),
  update: sql('product/update.sql'),
  delete: sql('product/delete.sql'),
  clear: sql('product/clear.sql'),
};

const MaterialGroupSql = {
  create: sql('material-group/create.sql'),
  read: sql('material-group/read.sql'),
  update: sql('material-group/update.sql'),
  delete: sql('material-group/delete.sql'),
  clear: sql('material-group/clear.sql'),
};

const MaterialSql = {
  create: sql('material/create.sql'),
  read: sql('material/read.sql'),
  update: sql('material/update.sql'),
  delete: sql('material/delete.sql'),
  clear: sql('material/clear.sql'),
};

const LabourCostSql = {
  create: sql('labour-cost/create.sql'),
  read: sql('labour-cost/read.sql'),
  update: sql('labour-cost/update.sql'),
  delete: sql('labour-cost/delete.sql'),
  clear: sql('labour-cost/clear.sql'),
};

const BillOfMaterialSql = {
  create: sql('bill-of-material/create.sql'),
  read: sql('bill-of-material/read.sql'),
  update: sql('bill-of-material/update.sql'),
  delete: sql('bill-of-material/delete.sql'),
  clear: sql('bill-of-material/clear.sql'),
};

export {
  RoleSql,
  UserSql,
  ProductCategorySql,
  ProductCategoryTypeSql,
  TypeSql,
  ProductGroupSql,
  ProductSql,
  MaterialGroupSql,
  MaterialSql,
  LabourCostSql,
  BillOfMaterialSql,
};
