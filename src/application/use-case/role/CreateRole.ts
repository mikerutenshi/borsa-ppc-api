import { ConflictError } from '../../../model/Errors';
import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import CreateUseCase from '../CreateUseCase';
import UseCase from '../UseCase';

//export default class CreateRole extends UseCase<Role, Role[]> {
//  repository: RoleRepository;
//  constructor(repository: RoleRepository) {
//    super();
//    this.repository = repository;
//  }
//
//  async execute(param: Role): Promise<Role[]> {
//    const roleExist = await this.repository.getOneByProp('name', param.name);
//
//    if (!roleExist) {
//      const newRole = await this.repository.create(param);
//      return [newRole];
//    } else {
//      throw new ConflictError('Role');
//    }
//  }
//}

export default class CreateRole extends CreateUseCase<
  RoleRepository,
  Role,
  Role
> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
