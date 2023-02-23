import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

class GetAllGenericTableUseCase<T> extends UseCase<string, T[]> {
  repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(tableName: string): Promise<T[]> {
    return await this.repository.getAll(tableName);
  }
}

export default GetAllGenericTableUseCase;
