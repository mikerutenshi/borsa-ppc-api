import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteUser extends DeleteUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
