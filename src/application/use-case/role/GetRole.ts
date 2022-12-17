import Role from '../../../model/Role';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class GetRole extends UseCase<number, Role[]> {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }

  async execute(param: number): Promise<Role[]> {
    const roles = await this.repository.getById(param);
    return [roles];
  }
}
