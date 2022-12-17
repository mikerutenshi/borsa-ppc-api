import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class GetRoles extends UseCase<undefined, Role[]> {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }

  async execute(): Promise<Role[]> {
    return await this.repository.getAll();
  }
}
