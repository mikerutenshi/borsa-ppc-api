import RoleRepository from '../../../application/contract/RoleRepository.mjs';
import { db } from './db.mjs';
import { RoleSql } from './sql.mjs';

export default class PgRoleRepository extends RoleRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async add(roleInstance) {
    return await this.db.any(RoleSql.create, roleInstance);
  }

  async getById(roleId) {
    return await this.db.any(RoleSql.getByPropExact, {
      column: 'id',
      value: id,
    });
  }

  async getAll() {
    return await this.db.any(RoleSql.getAll);
  }

  async getByProp(property, value) {
    return await this.db.any(RoleSql.getByPropApprox, {
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
    await this.db.none(RoleSql.deleteAll);
  }
}
