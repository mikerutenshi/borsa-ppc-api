import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import PgUserRepository from './PgUserRepository.mjs';
import { db } from './db.mjs';
import PgRoleRepository from './PgRoleRepository.mjs';
//import pgPromise from 'pg-promise';
//import promise from 'bluebird';
//import monitor from 'pg-monitor';
//import config from '../../../../config/config.mjs';

export default class PgDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.UserRepository = new PgUserRepository();
    this.RoleRepository = new PgRoleRepository();
  }

  async initDatabase() {
    //const options = {
    //  promiseLib: promise,
    //};
    //this.pgp = pgPromise(options);
    //if (config.nodeEnv !== 'production') {
    //  monitor.attach(options);
    //}
    //this.db = this.pgp(config.postgres.url);
    db.connect().then((obj) => {
      obj.done();
    });
  }

  async dropDatabase() {
    this.UserRepository.clear();
  }
}
