import { Hash } from '../../framework/web/encryption/Encrypt.mjs';

const AddUser = (userRepository) => {
  const execute = async (user) => {
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
  };

  return { execute };
};

const GetUsers = (userRepository) => {
  const execute = async () => {
    const users = await userRepository.getAll();
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  };

  return { execute };
};

const GetFilteredUsers = (userRepository) => {
  const execute = async (key, value) => {
    const users = await userRepository.getByProp(key, value);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  };

  return { execute };
};

const GetUser = (userRepository) => {
  const execute = async (id) => {
    const users = await userRepository.getById(id);
    const cleanUsers = removePasswords(users);

    return cleanUsers;
  };

  return { execute };
};

const UpdateUser = (userRepository) => {
  const execute = async (id, user) => {
    user.id = id;
    const updatedUser = await userRepository.update(user);
    return updatedUser;
  };

  return { execute };
};

const DeleteUser = (userRepository) => {
  const execute = async (id) => {
    const isSuccess = await userRepository.delete(id);

    return isSuccess;
  };

  return { execute };
};

const Authenticate = (userRepository) => {
  const execute = async (username, password) => {
    const users = await userRepository.authenticate(username, password);
    if (users && users.length == 1) {
      const cleanusers = users.map((user) => {
        const { id, is_active, refresh_token_exp_date, password, ...rest } =
          user;

        return rest;
      });

      return cleanusers;
    }
  };

  return { execute };
};

const RefreshAccessToken = (userRepository) => {
  const execute = async (username, refreshToken) => {
    const newAccessToken = await userRepository.refreshAccessToken(
      username,
      refreshToken
    );

    return newAccessToken;
  };

  return { execute };
};

const removePasswords = (users) => {
  const results = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return results;
};

export {
  AddUser,
  GetUsers,
  GetFilteredUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
  Authenticate,
  RefreshAccessToken,
};
