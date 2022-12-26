import { ConflictError } from '../../model/Errors';
import Table from '../../model/Table';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class CreateUseCase<T> extends UseCase<T, T[]> {
  private repository: CrudRepository<T>;
  private table: Table;

  constructor(repository: CrudRepository<T>, table: Table) {
    super();
    this.repository = repository;
    this.table = table;
  }
  async execute(param: T): Promise<T[]> {
    if (this.table.uniqueKey && this.table.uniqueVal) {
      const item = await this.repository.getOneByProp(
        this.table.uniqueKey,
        this.table.uniqueVal
      );

      if (item) {
        throw new ConflictError(StringUtil.transformTableName(this.table.name));
      } else {
        const item = await this.repository.create(param);
        return [item];
      }
    } else {
      const item = await this.repository.create(param);
      return [item];
    }
  }
}
