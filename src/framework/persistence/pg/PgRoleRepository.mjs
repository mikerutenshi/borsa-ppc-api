import RoleRepository from '../../../application/contract/RoleRepository.mjs';
import { RoleSql } from './sql.mjs';
import { db } from './db.mjs';
import PgBaseCRUDRepository from './PgBaseCrudRepository.mjs';

export default class PgRoleRepository extends PgBaseCRUDRepository {
  constructor(sql) {
    super(sql);
  }
}
