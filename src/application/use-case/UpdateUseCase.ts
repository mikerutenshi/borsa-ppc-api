import { BaseModel } from '../../model/BaseModel';
import { ConflictError, NotFoundError } from '../../model/Errors';
import KeyValuePair from '../../model/KeyValuePair';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class UpdateUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudRepository<T>;

  constructor(repository: CrudRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(param: T): Promise<T[]> {
    const _param = param as BaseModel;
    const __param = param as KeyValuePair;
    const tableName = StringUtil.transformTableName(_param.table_name);

    if (!_param.id) {
      throw Error(`${tableName} id is not provided`);
    }

    const itemExist = await this.repository.getOneById(_param.id);

    if (itemExist) {
      const duplicateItem = await this.repository.getOneByProperty(
        _param.unique_key,
        __param[_param.unique_key]
      );

      if (duplicateItem) {
        throw new ConflictError(tableName);
      } else {
        return [await this.repository.update(param)];
      }
    } else {
      throw new NotFoundError(tableName);
    }
  }

  getRepository() {
    return this.repository;
  }
}
