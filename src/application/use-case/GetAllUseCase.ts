import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class GetAllUseCase<T> extends UseCase<undefined, T[]> {
  repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(): Promise<T[]> {
    return await this.repository.getAll();
  }
}
