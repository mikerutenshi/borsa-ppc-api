import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import GetFilteredUseCase from '../GetFilteredUseCase';

export default class GetFilteredUsers extends GetFilteredUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  async execute(key: string, value: string): Promise<User[]> {
    const items = await super.execute(key, value);

    if (items.length > 0) {
      items.forEach((u) => (u.password = undefined));
    }

    return items;
  }
}
