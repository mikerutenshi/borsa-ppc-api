import ProjectDependencies from '../../di/projectDependencies.mjs';
import { ValidationError } from '../../model/Error.mjs';
import User from '../../model/User.mjs';

beforeAll(async () => {
  const { UserRepository } = ProjectDependencies.DatabaseService;
  await UserRepository.clear();
});

describe('Test user repository methods', () => {
  const { UserRepository } = ProjectDependencies.DatabaseService;
  const user = new User(
    'userrepotest',
    'User',
    'Repo Test',
    'kataKunci2022',
    1
  );
  const user1 = new User(
    'userrepotest1',
    'User',
    'Repo Test1',
    'kataKunci2022',
    1
  );
  const invalidUser = new User('mi', 'Mi', 'Hs', 'kt', 0);

  test('getUserById should return empty', async () => {
    const user = await UserRepository.getById(1);
    expect(user).toHaveLength(0);
  });

  test('Add should return user', async () => {
    const result = await UserRepository.add(user);
    expect(result.username).toBe(user.username);
  });

  test('Add should return user1', async () => {
    const result = await UserRepository.add(user1);
    expect(result.username).toBe(user1.username);
  });

  test('Add invalid should throw error', async () => {
    await expect(UserRepository.add(invalidUser)).rejects.toThrow(
      ValidationError
    );
    await UserRepository.add(invalidUser).catch((err) => {
      expect(err.body).toHaveProperty('username');
      expect(err.body).toHaveProperty('password');
      expect(err.body).toHaveProperty('first_name');
      expect(err.body).toHaveProperty('last_name');
      expect(err.body).toHaveProperty('role_id');
    });
  });

  test('Get by prop username should return user', async () => {
    const results = await UserRepository.getByProp('username', user1.username);
    expect(results[0].username).toBe(user1.username);
    expect(results[0]).toHaveProperty('username');
  });

  test('Get all should return users', async () => {
    const users = await UserRepository.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(2);
  });

  test('Update user should return updated user', async () => {
    user1.is_active = true;
    expect(user1.is_active).toBeTruthy();
    const results = await UserRepository.update(user1);
    expect(results[0].is_active).toBeTruthy();
  });

  test('Get by user id should return user', async () => {
    const results = await UserRepository.getById(2);
    expect(results[0].id).toBe(2);
  });

  test('Delete user should remove user', async () => {
    await UserRepository.delete(2);
    expect(await UserRepository.getById(2)).toHaveLength(0);
  });
});
