import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllRoles extends GetAllUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
