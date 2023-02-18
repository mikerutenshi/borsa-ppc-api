import QueryParams from '../../model/QueryParams';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class GetManyUseCase<T> extends UseCase<QueryParams, T[]> {
  repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(params: QueryParams): Promise<T[]> {
    const items = await this.repository.getMany(params);
    return items ? items : [];
  }
}
