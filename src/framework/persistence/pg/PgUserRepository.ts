import { UserSql } from './sql';
import { db } from './db';
import UserRepository from '../../../application/contract/UserRepository';
import { AuthParam, User } from '../../../model/Users';

export default class PgUserRepository implements UserRepository {
  async create(instance: User): Promise<User> {
    return await db.one(UserSql.create, instance);
  }

  async getById(id: number): Promise<User> {
    return await db.one(UserSql.getOneByProp, {
      column: 'id',
      value: id,
    });
  }
  async getAll(): Promise<User[]> {
    return await db.any(UserSql.getAll);
  }
  async getByProp(property: string, value: string): Promise<User[]> {
    return await db.any(UserSql.getManyByProp, {
      column: property,
      value: value,
    });
  }
  async getByName(name: string): Promise<User> {
    return await db.one(UserSql.getOneByProp, {
      column: 'username',
      value: name,
    });
  }
  async update(instance: User): Promise<User> {
    return await db.one(UserSql.update, {
      id: instance.id,
      first_name: instance.first_name,
      last_name: instance.last_name,
      role_id: instance.role_id,
      is_active: instance.is_active,
    });
  }
  async delete(id: number): Promise<void> {
    await db.none(UserSql.delete, id);
  }
  async clear(): Promise<void> {
    await db.none(UserSql.deleteAll);
  }

  async createAuth(instance: AuthParam): Promise<User> {
    return await db.one(UserSql.createAuth, {
      id: instance.id,
      refresh_token: instance.refresh_token,
      refresh_token_exp_date: instance.refresh_token_exp_date,
    });
  }
}
