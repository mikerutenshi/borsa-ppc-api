import { Hash, Token } from '../../../framework/web/encryption/Encrypt';
import { ForbiddenError, ValidationError } from '../../../model/Errors';
import { AuthParam, User } from '../../../model/Users';
import DateUtil from '../../../util/DateUtil';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class AuthUser extends UseCase<string, User[]> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }

  async execute(username: string, password: string): Promise<User[]> {
    const storedUser = await this.repository.getOneByProperty({
      username: username,
    });

    if (storedUser) {
      if (storedUser.is_active) {
        debugger;
        if (await Hash.compare(password, storedUser.password!)) {
          const refreshToken = Token.generateRefreshToken();
          const hashedRefreshToken = await Hash.create(refreshToken);
          let date = new Date();
          date = DateUtil.addDays(date, 7);
          const accessToken = await Token.generateAccessToken(
            username,
            storedUser.role_id
          );
          const stored = await this.repository.createAuth(
            new AuthParam(
              storedUser.id!,
              hashedRefreshToken,
              date.toUTCString()
            )
          );
          stored.access_token = accessToken;
          stored.refresh_token = refreshToken;
          return [stored];
        } else {
          throw new ValidationError([
            {
              password: 'Incorrect password',
            },
          ]);
        }
      } else {
        throw new ForbiddenError('User not yet activated');
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
