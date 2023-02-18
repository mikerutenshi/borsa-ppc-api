import CrudRepository from '../../../application/contract/CrudRepository';
import QueryParams from '../../../model/QueryParams';
import { SqlFiles } from '../../../util/CustomTypes';
import { db } from './db';
import QueryBuilder from './query-builder/QueryBuilder';

export default class PgCrudRepository<T> implements CrudRepository<T> {
  sql: SqlFiles;

  constructor(sql: SqlFiles) {
    this.sql = sql;
  }

  async getOneById(id: number): Promise<T | null> {
    const condition = new QueryBuilder()
      .propertyFilter('id', id.toString())
      .build();
    return await db.oneOrNone(this.sql.read, condition);
  }

  async getOneByProperty(key: string, value: string): Promise<T | null> {
    const condition = new QueryBuilder().propertyFilter(key, value).build();
    return await db.oneOrNone(this.sql.read, condition);
  }
  async getMany(params: QueryParams): Promise<T[]> {
    const condition = new QueryBuilder()
      .search(params.search_key, params.search_properties)
      .page(
        params.order_by,
        params.order_direction,
        params.page_index,
        params.page_limit
      );
    return await db.any(this.sql.read, condition);
  }
  async create(instance: T): Promise<T> {
    return await db.one(this.sql.create, instance);
  }

  async getAll(): Promise<T[]> {
    return await db.any(this.sql.read);
  }

  async update(instance: T): Promise<T> {
    return await db.one(this.sql.update, instance);
  }
  async delete(id: number[]): Promise<void> {
    await db.none(this.sql.delete, [id]);
  }
  async clear(): Promise<void> {
    await db.none(this.sql.clear);
  }
}
