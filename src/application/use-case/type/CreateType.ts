import { ConflictError } from '../../../model/Errors';
import { Type } from '../../../model/Types';
import TypeRepository from '../../contract/TypeRepository';
import UseCase from '../UseCase';

export default class CreateType extends UseCase<Type, Type[]> {
  repository: TypeRepository;
  constructor(repository: TypeRepository) {
    super();
    this.repository = repository;
  }

  async execute(param: Type, table: string): Promise<Type[]> {
    const alreadyExist = await this.repository.getOneByProp(
      table,
      'name',
      param.name
    );

    if (!alreadyExist) {
      const _type = await this.repository.create(param);
      return [_type];
    } else {
      throw new ConflictError('Role');
    }
  }
}
