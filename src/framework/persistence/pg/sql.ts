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
  getMany: sql('user/get-many-by-property.sql'),
  getOneByProperty: sql('user/get-one-by-property.sql'),
  getAll: sql('user/get-all.sql'),
  update: sql('user/update.sql'),
  delete: sql('user/delete.sql'),
  deleteAll: sql('user/delete-all.sql'),
  createAuth: sql('user/create-auth.sql'),
};

const ProductCategorySql = {
  create: sql('product-category/create.sql'),
  getMany: sql('product-category/get-many-by-property.sql'),
  getOneByProperty: sql('product-category/get-one-by-property.sql'),
  getAll: sql('product-category/get-all.sql'),
  update: sql('product-category/update.sql'),
  delete: sql('product-category/delete.sql'),
  deleteAll: sql('product-category/delete-all.sql'),
};

const ProductCategoryTypeSql = {
  create: sql('product-category-type/create.sql'),
  getMany: sql('product-category-type/get-many-by-property.sql'),
  getOneByProperty: sql('product-category-type/get-one-by-property.sql'),
  getAll: sql('product-category-type/get-all.sql'),
  update: sql('product-category-type/update.sql'),
  delete: sql('product-category-type/delete.sql'),
  deleteAll: sql('product-category-type/delete-all.sql'),
};

const TypeSql = {
  create: sql('type/create.sql'),
  getMany: sql('type/get-many-by-property.sql'),
  getOneByProperty: sql('type/get-one-by-property.sql'),
  getAll: sql('type/get-all.sql'),
  update: sql('type/update.sql'),
  delete: sql('type/delete.sql'),
  deleteAll: sql('type/delete-all.sql'),
};

const ProductGroupSql = {
  create: sql('product-group/create.sql'),
  getMany: sql('product-group/get-many-by-property.sql'),
  getOneByProperty: sql('product-group/get-one-by-property.sql'),
  getAll: sql('product-group/get-all.sql'),
  update: sql('product-group/update.sql'),
  delete: sql('product-group/delete.sql'),
  deleteAll: sql('product-group/delete-all.sql'),
};

export {
  RoleSql,
  UserSql,
  ProductCategorySql,
  ProductCategoryTypeSql,
  TypeSql,
  ProductGroupSql,
};
