import RoleRepository from '../../../application/contract/RoleRepository';
import Role from '../../../model/Role';
import PgCrudRepository from './PgCrudRepository';
import { RoleSql } from './sql';

export default class PgRoleRepository
  extends PgCrudRepository<Role>
  implements RoleRepository
{
  constructor() {
    super(RoleSql);
  }
}
