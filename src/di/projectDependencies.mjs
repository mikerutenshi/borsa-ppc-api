import InMemoryDatabaseService from '../framework/persistence/inMemory/InMemoryDatabaseService.mjs';

export default (() => {
  return {
    DatabaseService: new InMemoryDatabaseService(),
  };
})();
