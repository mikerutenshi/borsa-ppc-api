import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class GetUsers extends UseCase<undefined, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(): Promise<User[]> {
    return await this.repository.getAll();
  }
}
