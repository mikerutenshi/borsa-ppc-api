const AddUser = (userRepository) => {
  const execute = async (user) => {
    const users = await userRepository.getByProp('username', user.username);

    if (users.length > 0) {
      const err = new Error('User already exists');
      err.status = 409;
      throw err;
    } else {
      await userRepository.add(user);

      return 'User added successfully';
    }
  };

  return { execute };
};

const GetUsers = (userRepository) => {
  const execute = async () => {
    const users = await userRepository.getAll();
    const cleanUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return cleanUsers;
  };
  return { execute };
};

const GetUser = (userRepository) => {
  const execute = async (username) => {
    const user = await userRepository.getByUsername(username);
    return user;
  };

  return { execute };
};

export { AddUser, GetUsers, GetUser };
