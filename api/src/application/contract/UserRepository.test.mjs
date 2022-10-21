import ProjectDependencies from '../../di/projectDependencies.mjs';
import User from '../../model/User.mjs';
describe('Test user repository methods', () => {
  const { userRepository } = ProjectDependencies.DatabaseService;
  const user = new User('michaelhs', 'Michael', 'Susanto', 'kataKunci2023', 1);
  const invalidUser = new User(
    'michaelhs',
    'Michael',
    'HS',
    'kataKunci2023',
    1
  );
  test('getUserById should return undefined', async () => {
    const user = await userRepository.getById(1);
    expect(user).toBe(undefined);
  });

  test('Add should return user', async () => {
    const michael = await userRepository.add(user);
    expect(michael.username).toBe('michaelhs');
  });

  test('Add invalid should throw error', async () => {
    await expect(userRepository.add(invalidUser)).rejects.toThrow(Error);
  });

  test('Get by username should return user', async () => {
    const michael = await userRepository.getByUsername('michaelhs');
    expect(michael.username).toBe('michaelhs');
    expect(michael).toHaveProperty('username');
  });

  test('Get all should return users', async () => {
    const users = await userRepository.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].username).toBe('michaelhs');
  });

  test('Update user should return user', async () => {
    user.is_active = true;
    expect(user.is_active).toBeTruthy();
    const updatedUser = await userRepository.update(user);
    expect(updatedUser.is_active).toBeTruthy();
  });

  test('Get by user id should return user', async () => {
    const michael = await userRepository.getById(1);
    expect(michael.id).toBe(1);
  });

  test('Delete user should remove user', async () => {
    await userRepository.delete(1);
    expect(await userRepository.getById(1)).toBe(undefined);
  });
});
