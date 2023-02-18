import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateRole extends CreateUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
