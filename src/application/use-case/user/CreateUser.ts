import { Hash } from '../../../framework/web/encryption/Encrypt';
import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateUser extends CreateUseCase<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  async execute(param: User): Promise<User[]> {
    param.password = await Hash.create(param.password!);
    return super.execute(param);
  }
}
