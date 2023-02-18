import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class GetUser extends UseCase<number, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(id: number): Promise<User[]> {
    const user = await this.repository.getOneById(id);
    user?.password ? undefined : undefined;
    return user ? [user] : [];
  }
}
