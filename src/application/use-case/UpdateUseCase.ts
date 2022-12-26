import { BaseModel } from '../../model/BaseModel';
import { ConflictError, NotFoundError } from '../../model/Errors';
import Table from '../../model/Table';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class UpdateUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudRepository<T>;
  private table: Table;

  constructor(repository: CrudRepository<T>, table: Table) {
    super();
    this.repository = repository;
    this.table = table;
  }

  async execute(param: T): Promise<T[]> {
    const p = param as BaseModel;
    const tableName = StringUtil.transformTableName(this.table.name);

    if (!p.id) {
      throw Error(`${tableName} id is not provided`);
    }

    const itemExist = await this.repository.getById(p.id);

    if (itemExist) {
      if (this.table.uniqueKey && this.table.uniqueVal) {
        const duplicateItem = await this.repository.getOneByProp(
          this.table.uniqueKey,
          this.table.uniqueVal
        );

        if (duplicateItem) {
          throw new ConflictError(tableName);
        } else {
          return [await this.repository.update(p as T)];
        }
      } else {
        return [await this.repository.update(p as T)];
      }
    } else {
      throw new NotFoundError(tableName);
    }
  }
}
