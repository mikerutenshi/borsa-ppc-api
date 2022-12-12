import { Hash, Token } from '../../framework/web/encryption/Encrypt.mjs';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../../model/Error.mjs';
import { User } from '../../model/Users';
import DateUtil from '../../util/DateUtil.mjs';
import UserRepository from '../contract/UserRepository';
import UseCase from './UseCase';

export const AddUser = (userRepository) => {
  return BaseUseCase(async (user) => {
    const users = await userRepository.getByName(user.username);

    if (users.length > 0) {
      throw new ConflictError('User');
    } else {
      user.password = await Hash.create(user.password);
      const addedUser = await userRepository.add(user);
      const { password, id, ...rest } = addedUser;

      return rest;
    }
  });
};

export const GetUsers = (repository: UserRepository) => {
  const execute = async (): Promise<User[]> => {
    const users = await repository.getAll();
    const cleanUsers = removePasswords(users);
    return cleanUsers;
  };

  return execute;
};

export const GetFilteredUsers = (userRepository) => {
  return BaseUseCase(async (key, value) => {
    const users = await userRepository.getByProp(key, value);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
};

export const GetUser = (userRepository) => {
  return BaseUseCase(async (id) => {
    const users = await userRepository.getById(id);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
};

export const UpdateUser = (userRepository) => {
  return BaseUseCase(async (id, user) => {
    const userExists = await userRepository.getById(id);

    if (userExists.length == 0) {
      throw new NotFoundError('User');
    }

    user.id = id;
    const updatedUser = await userRepository.update(user);
    return updatedUser;
  });
};

export const DeleteUser = (userRepository) => {
  return BaseUseCase(async (id) => {
    const users = await userRepository.getById(id);

    if (users.length > 0) {
      await userRepository.delete(id);
    } else {
      throw new NotFoundError('User');
    }
  });
};

export const Authenticate = (userRepository) => {
  return BaseUseCase(async (username, password) => {
    const users = await userRepository.getByName(username);
    if (users.length > 0) {
      const user = users[0];

      if (user.is_active) {
        if (await Hash.compare(password, user.password)) {
          const refreshToken = await Token.generateRefreshToken();
          const encryptRefreshToken = await Hash.create(refreshToken);
          let date = new Date();
          date = DateUtil.addDays(date, 7);
          const accessToken = await Token.generateAccessToken(
            username,
            user.role_id
          );
          const results = await userRepository.authenticate({
            id: user.id,
            refresh_token: encryptRefreshToken,
            refresh_token_exp_date: date,
          });

          const cleanusers = results.map((user) => {
            const { id, is_active, refresh_token_exp_date, password, ...rest } =
              user;

            rest.refresh_token = refreshToken;
            rest.access_token = accessToken;
            return rest;
          });

          return cleanusers;
        } else {
          throw new ValidationError({
            password: 'Incorrect password',
          });
        }
      } else {
        throw new ForbiddenError('User is not yet activated');
      }
    } else {
      throw new ValidationError({
        username: 'User not found',
      });
    }
  });
};

export const RefreshAccessToken = (userRepository) => {
  return BaseUseCase(async (username, refreshToken) => {
    const users = await userRepository.getByName(username);

    if (users.length > 0) {
      const user = users[0];
      const tokenValid = await Token.validateRefreshToken(
        refreshToken,
        user.refresh_token_exp_date,
        user.refresh_token
      );

      switch (tokenValid) {
        case 'expired':
          throw new ForbiddenError('Refresh token has expired');
        case 'invalid':
          throw new ForbiddenError('Refresh tokens do not match');
        case 'valid':
          return await Token.generateAccessToken(user.username, user.role_id);
      }
    } else {
      return new NotFoundError('User');
    }
  });
};

const removePasswords = (users) => {
  const results = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return results;
};
