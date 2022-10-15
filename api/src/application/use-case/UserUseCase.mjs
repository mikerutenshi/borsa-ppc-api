const AddUser = (userRepository) => {
  const execute = async (user) => {
    const userExist = await userRepository.getByUsername(user.username);
    if (userExist) {
      throw new Error('User already exists');
    }

    await userRepository.add(user);

    return 'User added successfully';
  };

  return { execute };
};

const GetUsers = (userRepository) => {
  const execute = async () => {
    return await userRepository.getAll();
  };
  return { execute };
};

export { AddUser, GetUsers };
