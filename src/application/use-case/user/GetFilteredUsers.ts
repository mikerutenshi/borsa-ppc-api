import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class GetFilteredUsers extends UseCase<string, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(key: string, value: string): Promise<User[]> {
    return await this.repository.getByProp(key, value);
  }
}
