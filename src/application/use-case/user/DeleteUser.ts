import { NotFoundError } from '../../../model/Errors';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class DeleteUser extends UseCase<number, void> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(id: number): Promise<void> {
    const userExist = await this.repository.getById(id);

    if (!userExist) {
      throw new NotFoundError('User');
    } else {
      await this.repository.delete(id);
    }
  }
}
