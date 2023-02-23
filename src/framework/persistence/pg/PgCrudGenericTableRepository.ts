import CrudGenericTableRepository from '../../../application/contract/CrudGenericTableRepository';
import { BaseModel } from '../../../model/BaseModel';
import KeyValuePair from '../../../model/KeyValuePair';
import QueryParams from '../../../model/QueryParams';
import { SqlFiles } from '../../../util/CustomTypes';
import { db } from './db';
import QueryBuilder from './query-builder/QueryBuilder';

export default class PgCrudGenericTableRepository<T>
  implements CrudGenericTableRepository<T>
{
  private sql: SqlFiles;

  constructor(sql: SqlFiles) {
    this.sql = sql;
  }

  async getAll(tableName: string): Promise<T[]> {
    return await db.any(this.sql.read, { table_name: tableName });
  }
  async getOneById(id: number, tableName: string): Promise<T | null> {
    const instance = new QueryBuilder()
      .propertyFilter({ id: id.toString() })
      .build();
    instance.table_name = tableName;
    return await db.oneOrNone(this.sql.read, instance);
  }
  async getOneByProperty(
    keyValue: KeyValuePair,
    tableName: string
  ): Promise<T | null> {
    const instance = new QueryBuilder().propertyFilter(keyValue).build();
    instance.table_name = tableName;
    return await db.oneOrNone(this.sql.read, instance);
  }
  async getMany(params: QueryParams, tableName: string): Promise<T[]> {
    const instance = new QueryBuilder()
      .search(params.search_key, params.getSearchProperties())
      .page(
        params.order_by,
        params.order_direction,
        params.page_index,
        params.page_limit
      )
      .build();
    instance.table_name = tableName;
    return await db.any(this.sql.read, instance);
  }
  async delete(id: number[], tableName: string): Promise<void> {
    await db.none(this.sql.delete, { id: id, table_name: tableName });
  }
  async clear(tableName: string): Promise<void> {
    await db.none(this.sql.clear, { table_name: tableName });
  }
  async create(instance: T): Promise<T> {
    const tableName = (instance as BaseModel).table_name;
    return await db.one(this.sql.create, {
      table_name: tableName,
      ...instance,
    });
  }
  async update(instance: T): Promise<T> {
    const tableName = (instance as BaseModel).table_name;
    return await db.one(this.sql.update, {
      table_name: tableName,
      ...instance,
    });
  }
}
