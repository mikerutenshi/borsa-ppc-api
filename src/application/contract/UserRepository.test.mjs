import ProjectDependencies from '../../di/projectDependencies.mjs';
import { ValidationError } from '../../model/Error.mjs';
import { christine, invalidUser, phoebe } from '../../model/mock/Users.mjs';

beforeAll(async () => {
  const { UserRepository } = ProjectDependencies.DatabaseService;
  await UserRepository.clear();
});

describe('Test user repository methods', () => {
  const { UserRepository } = ProjectDependencies.DatabaseService;

  test('getUserById should return empty', async () => {
    const user = await UserRepository.getById(1);
    expect(user).toHaveLength(0);
  });

  test('Add should return user', async () => {
    const result = await UserRepository.add(christine);
    expect(result.username).toBe(christine.username);
  });

  test('Add should return user1', async () => {
    const result = await UserRepository.add(phoebe);
    expect(result.username).toBe(phoebe.username);
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
    const results = await UserRepository.getByProp('username', phoebe.username);
    expect(results[0].username).toBe(phoebe.username);
    expect(results[0]).toHaveProperty('username');
  });

  test('Get all should return users', async () => {
    const users = await UserRepository.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(2);
  });

  test('Update user should return updated user', async () => {
    phoebe.is_active = true;
    phoebe.id = 2;
    expect(phoebe.is_active).toBeTruthy();
    const results = await UserRepository.update(phoebe);
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
