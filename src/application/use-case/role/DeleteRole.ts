import { NotFoundError } from '../../../model/Errors';
import RoleRepository from '../../contract/RoleRepository';
import UseCase from '../UseCase';

export default class DeleteRole extends UseCase<number, void> {
  repository: RoleRepository;

  constructor(repository: RoleRepository) {
    super();
    this.repository = repository;
  }
  async execute(id: number): Promise<void> {
    const roleExist = await this.repository.getById(id);
    if (roleExist) {
      await this.repository.delete(id);
    } else {
      throw new NotFoundError('Role');
    }
  }
}
