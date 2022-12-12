import { NotFoundError } from '../../../model/Errors';
import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class UpdateUser extends UseCase<User, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(user: User): Promise<User[]> {
    let id: number;

    if (user.id) {
      id = user.id;
    } else {
      throw Error('User id is not provided');
    }

    const isUser = await this.repository.getById(id);

    if (!isUser) {
      throw new NotFoundError('User');
    }
    return [await this.repository.update(user)];
  }
}
