import { Hash, Token } from '../../../framework/web/encryption/Encrypt';
import { ForbiddenError, ValidationError } from '../../../model/Errors';
import { AuthParam, User } from '../../../model/Users';
import DateUtil from '../../../util/DateUtil';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class Authenticate extends UseCase<string, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }
  async execute(username: string, password: string): Promise<User[]> {
    const isUser = await this.repository.getByName(username);
    if (isUser) {
      if (isUser.is_active) {
        if (await Hash.compare(password, isUser.password!)) {
          const refreshToken = Token.generateRefreshToken();
          const hashedRefreshToken = await Hash.create(refreshToken);
          let date = new Date();
          date = DateUtil.addDays(date, 7);
          const accessToken = await Token.generateAccessToken(
            username,
            isUser.role_id
          );
          const stored = await this.repository.createAuth(
            new AuthParam(isUser.id!, hashedRefreshToken, date.toString())
          );
          stored.setAccessToken(accessToken);
          return [stored];
        } else {
          throw new ValidationError([
            {
              password: 'Incorrect password',
            },
          ]);
        }
      } else {
        throw new ForbiddenError('User is not yet activated');
      }
    } else {
      throw new ValidationError([
        {
          username: 'User not found',
        },
      ]);
    }
  }
}
