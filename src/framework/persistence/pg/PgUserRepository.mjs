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
    value = `%${value}%`;
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

  async getByUsername(username) {
    return await db.any(UserSql.getByPropExact, {
      column: 'username',
      value: username,
    });
  }

  async update(userInstance) {
    return await db.any(UserSql.update, {
      id: userInstance.id,
      first_name: userInstance.first_name,
      last_name: userInstance.last_name,
      role_id: userInstance.role_id,
      is_active: userInstance.is_active,
    });
  }

  async delete(userId) {
    return await db.any(UserSql.delete, userId);
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
