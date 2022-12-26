import Role from '../../../model/Role';
import Table from '../../../model/Table';
import RoleRepository from '../../contract/RoleRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateRole extends CreateUseCase<Role> {
  constructor(repository: RoleRepository, uniqueVal: string) {
    super(repository, new Table('role', 'name', uniqueVal));
  }
}
