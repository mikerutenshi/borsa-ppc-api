import { db } from './db';
import { CrudSql } from './sql';

export default class PgCrudRepository<M> {
  sql: CrudSql;

  constructor(sql: CrudSql) {
    this.sql = sql;
  }
  async create(instance: M): Promise<M> {
    return await db.one(this.sql.create, instance);
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
      table,
    });
  }
  async update(instance: M): Promise<M> {
    return await db.one(this.sql.update, instance);
  }
  async delete(id: number, table?: string): Promise<void> {
    await db.none(this.sql.delete, { id, table });
  }
  async clear(table?: string): Promise<void> {
    await db.none(this.sql.deleteAll, { table });
  }
}
