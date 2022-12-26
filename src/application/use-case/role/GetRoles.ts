import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetRoles extends GetManyUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
