import DatabaseService from '../../../application/contract/DatabaseService';
import PgUserRepository from './PgUserRepository';
import { db } from './db';
import PgRoleRepository from './PgRoleRepository';
import PgTypeRepository from './PgTypeRepository';

export default class PgDatabaseService extends DatabaseService {
  private typeRepoTables = ['product_category_type'];

  constructor() {
    super();
    this.userRepository = new PgUserRepository();
    this.roleRepository = new PgRoleRepository();
    this.typeRepository = new PgTypeRepository();
  }

  async initDatabase() {
    db.connect().then((obj) => {
      obj.done();
    });
  }

  async dropDatabase() {
    this.userRepository?.clear();
    this.roleRepository?.clear();
    this.typeRepoTables.forEach((table) => {
      this.typeRepository?.clear(table);
    });
  }
}
