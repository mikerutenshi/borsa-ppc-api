import { NotFoundError } from '../../model/Errors';
import StringUtil from '../../util/StringUtil';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class DeleteUseCase<T> extends UseCase<number, void> {
  private repository: CrudRepository<T>;
  private tableName: string;

  constructor(repository: CrudRepository<T>, tableName: string) {
    super();
    this.repository = repository;
    this.tableName = tableName;
  }

  async execute(id: number): Promise<void> {
    const exist = await this.repository.getById(id);

    if (exist) {
      await this.repository.delete(id);
    } else {
      throw new NotFoundError(StringUtil.transformTableName(this.tableName));
    }
  }
}
