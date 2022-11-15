import RoleRepository from '../../../application/contract/RoleRepository.mjs';
import { RoleSql } from './sql.mjs';
import { db } from './db.mjs';

export default class PgRoleRepository extends RoleRepository {
  async add(roleInstance) {
    return await db.any(RoleSql.create, roleInstance);
  }

  async getById(id) {
    return await db.any(RoleSql.getByPropExact, {
      column: 'id',
      value: id,
    });
  }

  async getByName(name) {
    return await db.any(RoleSql.getByPropExact, {
      column: 'name',
      value: name,
    });
  }

  async getAll() {
    return await db.any(RoleSql.getAll);
  }

  async getByProp(property, value) {
    return await db.any(RoleSql.getByPropApprox, {
      column: property,
      value: value,
    });
  }

  async update(roleInstance) {
    return Promise.reject(Error('not implemented'));
  }

  async delete(roleId) {
    return Promise.reject(Error('not implemented'));
  }

  async clear() {
    await db.none(RoleSql.deleteAll);
  }
}
