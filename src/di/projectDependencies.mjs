import InMemoryDatabaseService from '../framework/persistence/inMemory/InMemoryDatabaseService.mjs';
import PgDatabaseService from '../framework/persistence/pg/PgDatabaseService.mjs';

export default (() => {
  return {
    DatabaseService: new PgDatabaseService(),
  };
})();
