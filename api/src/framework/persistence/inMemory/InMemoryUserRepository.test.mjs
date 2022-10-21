import User from '../../../model/User.mjs';
import UserRepository from './InMemoryUserRepository.mjs';

describe('Test user repository methods', () => {
  const _UserRepository = new UserRepository();
  const user = new User('michaelhs', 'Michael', 'Susanto', 'kataKunci2023', 1);
  const invalidUser = new User(
    'michaelhs',
    'Michael',
    'HS',
    'kataKunci2023',
    1
  );

  test('Add should return user', async () => {
    const michael = await _UserRepository.add(user);
    expect(michael.username).toBe('michaelhs');
  });

  test('Add invalid should throw error', async () => {
    await expect(_UserRepository.add(invalidUser)).rejects.toThrow(Error);
  });

  test('Get by username should return user', async () => {
    const michael = await _UserRepository.getByUsername('michaelhs');
    expect(michael.username).toBe('michaelhs');
    expect(michael).toHaveProperty('username');
  });

  test('Get all should return users', async () => {
    const users = await _UserRepository.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].username).toBe('michaelhs');
  });
});
