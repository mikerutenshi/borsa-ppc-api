import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateRole extends UpdateUseCase<Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
