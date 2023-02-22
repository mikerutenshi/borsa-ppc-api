import { Token } from '../../../framework/web/encryption/Encrypt';
import {
  ForbiddenError,
  GeneralError,
  NotFoundError,
} from '../../../model/Errors';
import UserRepository from '../../contract/UserRepository';
import UseCase from '../UseCase';

export default class RefreshAccessToken extends UseCase<string, string> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }

  async execute(username: string, oldRefreshToken: string): Promise<string> {
    const userExist = await this.repository.getOneByProperty({
      username: username,
    });

    if (userExist) {
      const isTokenValid = await Token.validateRefreshToken(
        oldRefreshToken,
        userExist.refresh_token!,
        userExist.refresh_token_exp_date!
      );

      switch (isTokenValid) {
        case 'expired':
          throw new ForbiddenError('Refresh token has expired');
        case 'invalid':
          throw new ForbiddenError('Refresh tokens do not match');
        case 'valid':
          return await Token.generateAccessToken(
            userExist.username,
            userExist.role_id
          );
        default:
          throw new GeneralError(500, 'Token validation failed');
      }
    } else {
      const err = new NotFoundError();
      err.message = `User ${err.message}`;
      throw err;
    }
  }
}
