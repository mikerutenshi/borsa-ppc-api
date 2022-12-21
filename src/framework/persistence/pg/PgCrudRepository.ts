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

  async getById(id: number): Promise<M | null> {
    return await db.oneOrNone(this.sql.getOneByProp, {
      column: 'id',
      value: id,
    });
  }
  async getAll(): Promise<M[]> {
    return await db.any(this.sql.getAll);
  }
  async getManyByProp(property: string, value: string): Promise<M[]> {
    return await db.any(this.sql.getManyByProp, {
      column: property,
      value: value,
    });
  }
  async getOneByProp(property: string, value: string): Promise<M | null> {
    return await db.oneOrNone(this.sql.getOneByProp, {
      column: property,
      value: value,
    });
  }
  async update(instance: M): Promise<M> {
    return await db.one(this.sql.update, instance);
  }
  async delete(id: number): Promise<void> {
    await db.none(this.sql.delete, id);
  }
  async clear(): Promise<void> {
    await db.none(this.sql.deleteAll);
  }
}
