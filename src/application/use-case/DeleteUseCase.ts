import { BaseModel } from '../../model/BaseModel';
import { NotFoundError } from '../../model/Errors';
import KeyValuePair from '../../model/KeyValuePair';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class DeleteUseCase<T> extends UseCase<T[], void> {
  private repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(param: T[]): Promise<void> {
    const ids: number[] = [];
    const _param = param[0] as BaseModel;
    const __param = param[0] as KeyValuePair;

    param.forEach(async (o) => {
      const id = (o as BaseModel).id;
      if (
        await this.repository.getOneByProperty(
          _param.unique_key,
          __param[_param.unique_key]
        )
      ) {
        ids.push(id);
      } else {
        throw new NotFoundError(
          StringUtil.transformTableName(_param.table_name)
        );
      }
    });
    await this.repository.delete(ids);
  }

  getRepository() {
    return this.repository;
  }
}
