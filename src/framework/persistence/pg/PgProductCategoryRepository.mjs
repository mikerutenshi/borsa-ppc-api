import ProductCategoryRepository from '../../../application/contract/ProductCategoryRepository.mjs';
import { ProductCategorySql } from './sql.mjs';

export default class PgProductCategoryRepository extends ProductCategoryRepository {
  async add(instance) {
    return await db.any(ProductCategorySql.create, instance);
  }

  async getById(id) {
    return Promise.reject(Error('not implemented'));
  }

  async getAll() {
    return Promise.reject(Error('not implemented'));
  }

  async getByProp(property, value) {
    return Promise.reject(Error('not implemented'));
  }

  async getByName(name) {
    return Promise.reject(Error('not implemented'));
  }

  async update(instance) {
    return Promise.reject(Error('not implemented'));
  }

  async delete(id) {
    return Promise.reject(Error('not implemented'));
  }

  async clear() {
    return Promise.reject(new Error('not implemented'));
  }
}
