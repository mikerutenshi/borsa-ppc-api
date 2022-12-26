import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import GetFilteredUseCase from '../GetFilteredUseCase';

export default class GetFilteredRoles extends GetFilteredUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
