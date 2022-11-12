import { Hash } from '../../framework/web/encryption/Encrypt.mjs';
import { BaseUseCase } from './BaseUseCase.mjs';

export const AddUser = (userRepository) => {
  return new BaseUseCase(async (user) => {
    const users = await userRepository.getByProp('username', user.username);

    if (users.length > 0) {
      const err = new Error('User already exists');
      err.status = 409;
      throw err;
    } else {
      user.password = await Hash.create(user.password);
      const addedUser = await userRepository.add(user);
      const { password, id, ...rest } = addedUser;

      return rest;
    }
  });
};

export const GetUsers = (userRepository) => {
  return new BaseUseCase(async () => {
    const users = await userRepository.getAll();
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
};

export const GetFilteredUsers = (userRepository) => {
  return new BaseUseCase(async (key, value) => {
    const users = await userRepository.getByProp(key, value);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
};

export const GetUser = (userRepository) => {
  return new BaseUseCase(async (id) => {
    const users = await userRepository.getById(id);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  });
};

export const UpdateUser = (userRepository) => {
  return new BaseUseCase(async (id, user) => {
    user.id = id;
    const updatedUser = await userRepository.update(user);
    return updatedUser;
  });
};

export const DeleteUser = (userRepository) => {
  return new BaseUseCase(async (id) => {
    const isSuccess = await userRepository.delete(id);

    return isSuccess;
  });
};

export const Authenticate = (userRepository) => {
  return new BaseUseCase(async (username, password) => {
    const users = await userRepository.authenticate(username, password);
    if (users && users.length == 1) {
      const cleanusers = users.map((user) => {
        const { id, is_active, refresh_token_exp_date, password, ...rest } =
          user;

        return rest;
      });

      return cleanusers;
    }
  });
};

export const RefreshAccessToken = (userRepository) => {
  return new BaseUseCase(async (username, refreshToken) => {
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
