import DatabaseService from '../application/contract/DatabaseService';
import PgDatabaseService from '../framework/persistence/pg/PgDatabaseService';

//export default (() => {
//  return {
//    DatabaseService: new PgDatabaseService(),
//  };
//})();

export default class ProjectDependencies {
  databaseService: DatabaseService;
  constructor() {
    this.databaseService = new PgDatabaseService();
  }

  getDatabaseService = () => {
    return this.databaseService;
  };
}
