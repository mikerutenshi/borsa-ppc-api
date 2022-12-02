import { join, resolve } from 'path';
import pgPromise from 'pg-promise';

const sql = (file) => {
  const fullPath = join(resolve('./sql'), file);
  return new pgPromise.QueryFile(fullPath, { minify: true });
};

const RoleSql = {
  create: sql('role/create.sql'),
  getByPropApprox: sql('role/get-by-property-approx.sql'),
  getByPropExact: sql('role/get-by-property-exact.sql'),
  getAll: sql('role/get-all.sql'),
  update: sql('role/update.sql'),
  delete: sql('role/delete.sql'),
  deleteAll: sql('role/delete-all.sql'),
};

const UserSql = {
  create: sql('user/create.sql'),
  getByPropApprox: sql('user/get-by-property-approx.sql'),
  getByPropExact: sql('user/get-by-property-exact.sql'),
  getAll: sql('user/get-all.sql'),
  update: sql('user/update.sql'),
  delete: sql('user/delete.sql'),
  deleteAll: sql('user/delete-all.sql'),
  authenticate: sql('user/authenticate.sql'),
};

const ProductCategorySql = {
  create: sql('product-category/create.sql'),
  getByPropApprox: sql('product-category/get-by-property-approx.sql'),
  getByPropExact: sql('product-category/get-by-property-exact.sql'),
  getAll: sql('product-category/get-all.sql'),
  update: sql('product-category/update.sql'),
  delete: sql('product-category/delete.sql'),
  deleteAll: sql('product-category/delete-all.sql'),
};

export { RoleSql, UserSql, ProductCategorySql };
