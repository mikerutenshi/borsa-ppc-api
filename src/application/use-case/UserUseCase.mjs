import { Hash, Token } from '../../framework/web/encryption/Encrypt.mjs';
import { BaseUseCase } from './BaseUseCase.mjs';
import { GenericError, ValidationError } from '../../model/Error.mjs';
import DateUtil from '../../util/DateUtil.mjs';

export const AddUser = (userRepository) => {
  return BaseUseCase(async (user) => {
    const users = await userRepository.getByUsername(user.username);

    if (users.length > 0) {
      throw new GenericError(409, 'User already exists');
    } else {
      user.password = await Hash.create(user.password);
      const addedUser = await userRepository.add(user);
      const { password, id, ...rest } = addedUser;

      return rest;
    }
  });
};

export const GetUsers = (userRepository) => {
  return BaseUseCase(async () => {
    const users = await userRepository.getAll();
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
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
    user.id = id;
    const updatedUser = await userRepository.update(user);
    return updatedUser;
  });
};

export const DeleteUser = (userRepository) => {
  return BaseUseCase(async (id) => {
    const users = await userRepository.getById(id);

    if (users.length > 0) {
      const isSuccess = await userRepository.delete(id);

      return isSuccess;
    } else {
      throw new GenericError(404, 'User not found');
    }
  });
};

export const Authenticate = (userRepository) => {
  return BaseUseCase(async (username, password) => {
    const users = await userRepository.getByUsername(username);
    console.log('users', users);
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

          console.log('results', results);
          const cleanusers = results.map((user) => {
            const { id, is_active, refresh_token_exp_date, password, ...rest } =
              user;

            rest.refresh_token = refreshToken;
            rest.access_token = accessToken;
            return rest;
          });

          console.log('cleanusers', cleanusers);
          return cleanusers;
        } else {
          throw new ValidationError({
            password: 'Incorrect password',
          });
        }
      } else {
        throw new GenericError(403, 'User is not yet activated');
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
    const newAccessToken = await userRepository.refreshAccessToken(
      username,
      refreshToken
    );

    return newAccessToken;
  });
};

const removePasswords = (users) => {
  const results = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return results;
};
