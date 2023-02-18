import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllUsers extends GetAllUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
