import { BaseModel } from '../../model/BaseModel';
import { NotFoundError } from '../../model/Errors';
import { prettierTableName } from '../../util/StringUtil';
import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

export default class DeleteGenericTableUseCase<T> extends UseCase<
  number[],
  void
> {
  private repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }
  async execute(ids: number[], model: T): Promise<void> {
    const tableName = (model as BaseModel).table_name;
    const deleteIds: number[] = [];

    for (const id of ids) {
      if (await this.repository.getOneById(id, tableName)) {
        deleteIds.push(id);
      } else {
        throw new NotFoundError(prettierTableName(tableName));
      }
    }

    await this.repository.delete(ids, tableName);
  }

  getRepository() {
    return this.repository;
  }
}
