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

  async execute(param: T, tableName?: string): Promise<T[]> {
    const p = param as BaseModel;
    const tn = StringUtil.transformTableName(this.table.name);

    if (!p.id) {
      throw Error(`${tn} id is not provided`);
    }

    const itemExist = await this.repository.getById(p.id, tableName);

    if (itemExist) {
      if (this.table.uniqueKey && this.table.uniqueVal) {
        const duplicateItem = await this.repository.getOneByProp(
          this.table.uniqueKey,
          this.table.uniqueVal,
          tableName
        );

        if (duplicateItem) {
          throw new ConflictError(tn);
        } else {
          return [await this.repository.update(p as T, tableName)];
        }
      } else {
        return [await this.repository.update(p as T, tableName)];
      }
    } else {
      throw new NotFoundError(tn);
    }
  }
}
