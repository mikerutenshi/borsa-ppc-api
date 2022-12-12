import PgDatabaseService from '../framework/persistence/pg/PgDatabaseService';

export default (() => {
  return {
    DatabaseService: new PgDatabaseService(),
  };
})();
