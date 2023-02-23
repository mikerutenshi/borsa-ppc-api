import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

export default class GetOneGenericTableUseCase<T> extends UseCase<number, T[]> {
  private repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(id: number, tableName: string): Promise<T[]> {
    const item = await this.repository.getOneById(id, tableName);
    return item ? [item] : [];
  }
}
