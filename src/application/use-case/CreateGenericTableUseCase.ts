import { BaseModel } from '../../model/BaseModel';
import { ConflictError } from '../../model/Errors';
import { createPairFromParam } from '../../util/FilterUtil';
import { prettierTableName } from '../../util/StringUtil';
import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

export default class CreateiGenericTableUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }
  async execute(param: T): Promise<T[]> {
    const tableName = (param as BaseModel).table_name;
    const keyValues = createPairFromParam(param);
    const item = await this.repository.getOneByProperty(keyValues, tableName);

    if (item) {
      throw new ConflictError(prettierTableName(tableName));
    } else {
      const item = await this.repository.create(param);
      return [item];
    }
  }

  getRepository() {
    return this.repository;
  }
}
