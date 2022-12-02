import BaseCRUDRepository from '../../../application/contract/BaseCRUDRepository.mjs';
import { db } from './db.mjs';

export default class PgBaseCRUDRepository extends BaseCRUDRepository {
  constructor(sql) {
    super();
    this.sql = sql;
  }
  async add(roleInstance) {
    return await db.any(this.sql.create, roleInstance);
  }

  async getById(id) {
    return await db.any(this.sql.getByPropExact, {
      column: 'id',
      value: id,
    });
  }

  async getByName(name) {
    return await db.any(this.sql.getByPropExact, {
      column: 'name',
      value: name,
    });
  }

  async getAll() {
    return await db.any(this.sql.getAll);
  }

  async getByProp(property, value) {
    return await db.any(this.sql.getByPropApprox, {
      column: property,
      value: value,
    });
  }

  async update(roleInstance) {
    return await db.any(this.sql.update, {
      id: roleInstance.id,
      name: roleInstance.name,
    });
  }

  async delete(roleId) {
    return await db.none(this.sql.delete, roleId);
  }

  async clear() {
    await db.none(this.sql.deleteAll);
  }
}
