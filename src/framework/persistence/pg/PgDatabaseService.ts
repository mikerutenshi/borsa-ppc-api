import DatabaseService from '../../../application/contract/DatabaseService';
import PgUserRepository from './PgUserRepository';
import { db } from './db';
import PgRoleRepository from './PgRoleRepository';

export default class PgDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.userRepository = new PgUserRepository();
    this.roleRepository = new PgRoleRepository();
  }

  async initDatabase() {
    db.connect().then((obj) => {
      obj.done();
    });
  }

  async dropDatabase() {
    this.userRepository?.clear();
    this.roleRepository?.clear();
  }
}
