import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class GetOneUseCase<T> extends UseCase<number, T[]> {
  repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(id: number): Promise<T[]> {
    const item = await this.repository.getById(id);
    return item ? [item] : [];
  }
}
