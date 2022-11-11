import UserRepository from '../../../application/contract/UserRepository.mjs';
import { UserSql } from './sql.mjs';
import { db } from './db.mjs';

export default class PgUserRepository extends UserRepository {
  async add(userInstance) {
    return await db.any(UserSql.create, userInstance);
  }

  async getAll() {
    return await db.any(UserSql.getAll);
  }

  async getByProp(property, value) {
    return await db.any(UserSql.getByPropApprox, {
      column: property,
      value: value,
    });
  }

  async getById(id) {
    return await db.any(UserSql.getByPropExact, {
      column: 'id',
      value: id,
    });
  }

  async update(userInstance) {
    return Promise.reject(new Error('not implemented'));
  }

  async delete(userId) {
    return Promise.reject(new Error('not implemented'));
  }

  async authenticate(username, password) {
    return Promise.reject(new Error('not implemented'));
  }

  async refreshAccessToken(username, refreshToken) {
    return Promise.reject(new Error('not implemented'));
  }

  async clear() {
    await db.none(UserSql.deleteAll);
  }
}
