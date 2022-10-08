const AddUser = (UserRepository) => {
  const execute = async (user) => {
    const userExist = await UserRepository.getByUsername(user.username);
    if (userExist) {
      throw new Error('User already exists');
    }

    await UserRepository.add(user);

    return 'User added successfully';
  };

  return { execute };
};

export { AddUser };
