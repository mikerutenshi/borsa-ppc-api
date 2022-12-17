import { ConflictError, NotFoundError } from '../../../model/Errors';
import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class UpdateRole extends UseCase<Role, Role[]> {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }

  async execute(param: Role): Promise<Role[]> {
    let id: number;

    if (param.id) {
      id = param.id;
    } else {
      throw Error('Role id is not provided');
    }

    const roleExist = await this.repository.getById(id);

    if (!roleExist) {
      throw new NotFoundError('Role');
    } else {
      const duplicateName = await this.repository.getByName(param.name);
      if (!duplicateName) {
        return [await this.repository.update(param)];
      } else {
        throw new ConflictError('Role');
      }
    }
  }
}
