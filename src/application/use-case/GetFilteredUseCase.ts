import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class GetFilteredUseCase<T> extends UseCase<string, T[]> {
  repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(key: string, value: string): Promise<T[]> {
    const items = await this.repository.getManyByProp(key, value);
    return items ? items : [];
  }
}
