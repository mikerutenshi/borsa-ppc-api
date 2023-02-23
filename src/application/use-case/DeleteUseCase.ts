import { BaseModel } from '../../model/BaseModel';
import { NotFoundError } from '../../model/Errors';
import { prettierTableName } from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class DeleteUseCase<T> extends UseCase<number[], void> {
  private repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(ids: number[], model: T): Promise<void> {
    const _model = model as BaseModel;
    const deleteIds: number[] = [];

    for (const id of ids) {
      if (await this.repository.getOneById(id)) {
        deleteIds.push(id);
      } else {
        throw new NotFoundError(prettierTableName(_model.table_name));
      }
    }

    await this.repository.delete(ids);
  }

  getRepository() {
    return this.repository;
  }
}
