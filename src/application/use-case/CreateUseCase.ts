import { BaseModel } from '../../model/BaseModel';
import { ConflictError } from '../../model/Errors';
import KeyValuePair from '../../model/KeyValuePair';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class CreateUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }
  async execute(param: T): Promise<T[]> {
    const _param = param as BaseModel;
    const __param = param as KeyValuePair;
    const item = await this.repository.getOneByProperty(
      _param.unique_key,
      __param[_param.unique_key]
    );

    if (item) {
      throw new ConflictError(StringUtil.transformTableName(_param.table_name));
    } else {
      const item = await this.repository.create(param);
      return [item];
    }
  }

  getRepository() {
    return this.repository;
  }
}
