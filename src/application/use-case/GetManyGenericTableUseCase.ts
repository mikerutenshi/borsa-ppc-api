import QueryParams from '../../model/QueryParams';
import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

export default class GetManyGenericTableUseCase<T> extends UseCase<
  QueryParams,
  T[]
> {
  private repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(params: QueryParams, tableName: string): Promise<T[]> {
    const items = await this.repository.getMany(params, tableName);
    return items ? items : [];
  }
}
