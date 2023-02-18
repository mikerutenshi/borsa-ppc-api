import QueryParams from '../../../model/QueryParams';
import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetUsers extends GetManyUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
  async execute(params: QueryParams): Promise<User[]> {
    const users = await super.execute(params);

    if (users.length > 0) {
      users.forEach((u) => (u.password = undefined));
    }
  }
}
