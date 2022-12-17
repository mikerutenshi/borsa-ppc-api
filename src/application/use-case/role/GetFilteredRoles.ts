import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class GetFilteredRoles extends UseCase<string, Role[]> {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }

  async execute(key: string, value: string): Promise<Role[]> {
    return await this.repository.getByProp(key, value);
  }
}
