import { BaseModel } from '../../model/BaseModel';
import { ConflictError } from '../../model/Errors';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class CreateUseCase<R, P, T> extends UseCase<P, T[]> {
  private repository: R;

  constructor(repository: R) {
    super();
    this.repository = repository;
  }
  async execute(param: P): Promise<T[]> {
    const uniqueKey = (param as BaseModel).uniqueKey;
    const uniqueVal = (param as BaseModel).uniqueVal;
    const item = await (
      this.repository as CrudRepository<BaseModel>
    ).getOneByProp(uniqueKey, uniqueVal);

    if (item) {
      const tableName = StringUtil.transformTableName(
        (param as BaseModel).table
      );
      throw new ConflictError(tableName);
    } else {
      const item = await (this.repository as CrudRepository<BaseModel>).create(
        param as BaseModel
      );
      return [item as T];
    }
  }
}
