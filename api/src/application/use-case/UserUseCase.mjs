const AddUser = (userRepository) => {
  const execute = async (user) => {
    const userExist = await userRepository.getByUsername(user.username);

    if (userExist) {
      throw Error('User already exists');
    }

    await userRepository.add(user);

    return 'User added successfully';
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

export { AddUser, GetUsers };
