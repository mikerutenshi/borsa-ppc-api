import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetRole extends GetOneUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
