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

  async execute(id: number, tableName?: string): Promise<void> {
    const exist = await this.repository.getById(id, tableName);

    if (exist) {
      await this.repository.delete(id, tableName);
    } else {
      throw new NotFoundError(StringUtil.transformTableName(this.tableName));
    }
  }

  getRepository() {
    return this.repository;
  }
}
