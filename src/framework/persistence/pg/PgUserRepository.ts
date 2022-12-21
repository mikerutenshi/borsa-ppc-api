import { UserSql } from './sql';
import { db } from './db';
import UserRepository from '../../../application/contract/UserRepository';
import { AuthParam, User } from '../../../model/Users';
import PgCrudRepository from './PgCrudRepository';

export default class PgUserRepository
  extends PgCrudRepository<User>
  implements UserRepository
{
  constructor() {
    super(UserSql);
  }

  async createAuth(instance: AuthParam): Promise<User> {
    return await db.one(UserSql.createAuth, {
      id: instance.id,
      refresh_token: instance.refresh_token,
      refresh_token_exp_date: instance.refresh_token_exp_date,
    });
  }
}
