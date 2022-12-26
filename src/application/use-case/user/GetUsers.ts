import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetUsers extends GetManyUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
