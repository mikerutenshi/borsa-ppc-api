import { join, resolve } from 'path';
import pgPromise, { QueryFile } from 'pg-promise';

const sql = (file: string): QueryFile => {
  const fullPath = join(resolve('./sql'), file);
  return new pgPromise.QueryFile(fullPath, { minify: true });
};

interface CrudSql {
  [method: string]: QueryFile;
}

const RoleSql = {
  create: sql('role/create.sql'),
  getManyByProp: sql('role/get-many-by-property.sql'),
  getOneByProp: sql('role/get-one-by-property.sql'),
  getAll: sql('role/get-all.sql'),
  update: sql('role/update.sql'),
  delete: sql('role/delete.sql'),
  deleteAll: sql('role/delete-all.sql'),
};

const UserSql = {
  create: sql('user/create.sql'),
  getManyByProp: sql('user/get-many-by-property.sql'),
  getOneByProp: sql('user/get-one-by-property.sql'),
  getAll: sql('user/get-all.sql'),
  update: sql('user/update.sql'),
  delete: sql('user/delete.sql'),
  deleteAll: sql('user/delete-all.sql'),
  createAuth: sql('user/create-auth.sql'),
};

const ProductCategorySql = {
  create: sql('product-category/create.sql'),
  getManyByProp: sql('product-category/get-many-by-property.sql'),
  getOneByProp: sql('product-category/get-one-by-property.sql'),
  getAll: sql('product-category/get-all.sql'),
  update: sql('product-category/update.sql'),
  delete: sql('product-category/delete.sql'),
  deleteAll: sql('product-category/delete-all.sql'),
};

export { CrudSql, RoleSql, UserSql, ProductCategorySql };
