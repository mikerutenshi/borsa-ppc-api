import { ConflictError } from '../../../model/Errors';
import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class CreateRole extends UseCase<Role, Role[]> {
  repository: RoleRepository;
  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }

  async execute(param: Role): Promise<Role[]> {
    const roleExist = await this.repository.getByName(param.name);

    if (!roleExist) {
      const newRole = await this.repository.create(param);
      return [newRole];
    } else {
      throw new ConflictError('Role');
    }
  }
}
