import { logger } from '../../../util/Logger';
import { db } from './db';
import { CrudSql } from './sql';

export default class PgCrudRepository<M> {
  sql: CrudSql;

  constructor(sql: CrudSql) {
    this.sql = sql;
  }
  async create(instance: M, table?: string): Promise<M> {
    const obj = { ...instance, table };
    return await db.one(this.sql.create, obj);
  }

  async getById(id: number, table?: string): Promise<M | null> {
    return await db.oneOrNone(this.sql.getOneByProp, {
      column: 'id',
      value: id,
      table,
    });
  }
  async getAll(table?: string): Promise<M[]> {
    return await db.any(this.sql.getAll, { table });
  }
  async getManyByProp(
    property: string,
    value: string,
    table?: string
  ): Promise<M[]> {
    return await db.any(this.sql.getManyByProp, {
      column: property,
      value: value,
      table,
    });
  }
  async getOneByProp(
    property: string,
    value: string,
    table?: string
  ): Promise<M | null> {
    return await db.oneOrNone(this.sql.getOneByProp, {
      column: property,
      value: value,
      table: table,
    });
  }
  async update(instance: M, table?: string): Promise<M> {
    const obj = { ...instance, table };
    return await db.one(this.sql.update, obj);
  }
  async delete(id: number, table?: string): Promise<void> {
    await db.none(this.sql.delete, { id, table });
  }
  async clear(table?: string): Promise<void> {
    await db.none(this.sql.deleteAll, { table });
  }
}
