import RoleRepository from '../../../application/contract/RoleRepository';
import Role from '../../../model/Role';
import { db } from './db';
import { RoleSql } from './sql';

export default class PgRoleRepository implements RoleRepository {
  async create(instance: Role): Promise<Role> {
    return await db.one(RoleSql.create, instance);
  }
  async getById(id: number): Promise<Role> {
    const role = await db.oneOrNone(RoleSql.getOneByProp, {
      column: 'id',
      value: id,
    });
    return role;
  }
  async getAll(): Promise<Role[]> {
    return await db.any(RoleSql.getAll);
  }
  async getByProp(property: string, value: string): Promise<Role[]> {
    return await db.any(RoleSql.getManyByProp, {
      column: property,
      value: value,
    });
  }
  async getByName(name: string): Promise<Role> {
    const role = await db.oneOrNone(RoleSql.getOneByProp, {
      column: 'name',
      value: name,
    });
    return role;
  }
  async update(instance: Role): Promise<Role> {
    return await db.one(RoleSql.update, {
      id: instance.id,
      name: instance.name,
    });
  }
  async delete(id: number): Promise<void> {
    await db.none(RoleSql.delete, id);
  }
  async clear(): Promise<void> {
    await db.none(RoleSql.deleteAll);
  }
}
