import RoleRepository from '../../../application/contract/RoleRepository.mjs';
import { db } from './db.mjs';

export default class PgRoleRepository extends RoleRepository {
  constructor() {
    super();
  }

  async add(roleInstance) {
    return Promise.reject(Error('not implemented'));
  }

  async getById(roleId) {
    return Promise.reject(Error('not implemented'));
  }

  async getAll() {
    return Promise.reject(Error('not implemented'));
  }

  async getByProp(property, value) {
    return Promise.reject(Error('not implemented'));
  }

  async update(roleInstance) {
    return Promise.reject(Error('not implemented'));
  }

  async delete(roleId) {
    return Promise.reject(Error('not implemented'));
  }

  async clear() {
    return Promise.reject(new Error('not implemented'));
  }
}
