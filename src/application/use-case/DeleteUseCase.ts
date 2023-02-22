import { BaseModel } from '../../model/BaseModel';
import { NotFoundError } from '../../model/Errors';
import StringUtil from '../../util/StringUtil';
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

    ids.forEach(async (id) => {
      if (await this.repository.getOneById(id)) {
        deleteIds.push(id);
      } else {
        throw new NotFoundError(
          StringUtil.transformTableName(_model.table_name)
        );
      }
    });
    await this.repository.delete(ids);
  }

  getRepository() {
    return this.repository;
  }
}
