import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateUser extends UpdateUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
