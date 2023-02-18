import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteRole extends DeleteUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
