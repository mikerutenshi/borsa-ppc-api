import { BaseModel } from '../../model/BaseModel';
import { ConflictError, NotFoundError } from '../../model/Errors';
import { createPairFromParam } from '../../util/FilterUtil';
import { prettierTableName } from '../../util/StringUtil';
import CrudGenericTableRepository from '../contract/CrudGenericTableRepository';
import UseCase from './UseCase';

export default class UpdateGenericTableUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudGenericTableRepository<T>;

  constructor(repository: CrudGenericTableRepository<T>) {
    super();
    this.repository = repository;
  }

  async execute(param: T): Promise<T[]> {
    const _param = param as BaseModel;
    const tableName = prettierTableName(_param.table_name);

    if (!_param.id) {
      throw Error(`${tableName} id is not provided`);
    }

    const itemExist = await this.repository.getOneById(_param.id, tableName);

    if (itemExist) {
      const duplicateItem = await this.repository.getOneByProperty(
        createPairFromParam(param),
        tableName
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
