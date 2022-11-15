import { Hash } from '../../framework/web/encryption/Encrypt.mjs';
import { BaseUseCase } from './BaseUseCase.mjs';
import { GenericError } from '../../model/Error.mjs';

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
