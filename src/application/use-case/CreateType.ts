import { ConflictError } from '../../model/Errors';
import { Type } from '../../model/Types';
import CrudRepository from '../contract/CrudRepository';
import UseCase from './UseCase';

export default class CreateType<R, P, T> extends UseCase<P, T[]> {
  private repository: R;

  constructor(repository: R) {
    super();
    this.repository = repository;
  }
  async execute(param: P): Promise<T[]> {
    const item = await (this.repository as CrudRepository<Type>).getOneByProp(
      'name',
      (param as Type).name
    );

    if (item) {
      throw new ConflictError('Type');
    } else {
      const item = await (this.repository as CrudRepository<Type>).create(
        param as Type
      );
      return [item as T];
    }
  }
}
