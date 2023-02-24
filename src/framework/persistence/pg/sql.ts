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

export {
  RoleSql,
  UserSql,
  ProductCategorySql,
  ProductCategoryTypeSql,
  TypeSql,
  ProductGroupSql,
  ProductSql,
};
