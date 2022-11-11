import { join, resolve } from 'path';
import pgPromise from 'pg-promise';

const sql = (file) => {
  const fullPath = join(resolve('./sql'), file);
  return new pgPromise.QueryFile(fullPath, { minify: true });
};

export const RoleSql = {
  create: sql('role/create.sql'),
  deleteAll: sql('role/delete-all.sql'),
  getByPropApprox: sql('role/get-by-property-approx.sql'),
  getByPropExact: sql('role/get-by-property-exact.sql'),
  getAll: sql('role/get-all.sql'),
};

export const UserSql = {
  create: sql('user/create.sql'),
  deleteAll: sql('user/delete-all.sql'),
  getByPropApprox: sql('user/get-by-property-approx.sql'),
  getByPropExact: sql('user/get-by-property-exact.sql'),
  getAll: sql('user/get-all.sql'),
};
