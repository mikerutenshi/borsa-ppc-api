import { BaseModel } from '../../model/BaseModel';
import { ConflictError } from '../../model/Errors';
import { createPairFromParam } from '../../util/FilterUtil';
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
    const keyValues = createPairFromParam(param);
    const item = await this.repository.getOneByProperty(keyValues);

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
