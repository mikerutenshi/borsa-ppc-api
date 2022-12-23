import { Hash } from '../../../framework/web/encryption/Encrypt';
import { ConflictError } from '../../../model/Errors';
import { User } from '../../../model/Users';
import UserRepository from '../../contract/UserRepository';
import CreateUseCase from '../CreateUseCase';
import UseCase from '../UseCase';

export default class CreateUser extends CreateUseCase<
  UserRepository,
  User,
  User
> {
  //repository: UserRepository;

  constructor(repository: UserRepository) {
    super(repository);
    //  this.repository = repository;
  }

  async execute(param: User): Promise<User[]> {
    param.password = await Hash.create(param.password!);
    return super.execute(param);
  }

  //async execute(param: User): Promise<User[]> {
  //  const userExist = await this.repository.getOneByProp(
  //    'username',
  //    param.username
  //  );

  //  if (userExist) {
  //    throw new ConflictError('User');
  //  } else {
  //    param.password = await Hash.create(param.password!);
  //    return [await this.repository.create(param)];
  //  }
  //}
}
