import Role from '../../../model/Role';
import Table from '../../../model/Table';
import RoleRepository from '../../contract/RoleRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateRole extends UpdateUseCase<Role> {
  constructor(repository: RoleRepository, uniqueVal: string) {
    super(repository, new Table('role', 'name', uniqueVal));
  }
}
