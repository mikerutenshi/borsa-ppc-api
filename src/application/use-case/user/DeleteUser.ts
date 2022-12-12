import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class DeleteUser extends UseCase<number, void> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
