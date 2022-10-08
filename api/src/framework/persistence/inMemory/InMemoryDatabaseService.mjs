import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import { Role, User } from '../../../model/User.mjs';
import InMemoryUserRepository from '../inMemory/InMemoryUserRepository.mjs';

export default class InMemoryDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.userRepository = new InMemoryUserRepository();
  }

  async initDatabase() {
    this.seedData();
  }

  async seedData() {
    let mockRole = new Role('superuser');
    mockRole = await this.userRepository.addRole(mockRole);
    await this.userRepository.add(
      new User(
        'michaelhs',
        'Michael',
        'Susanto',
        'katakunci',
        mockRole,
        'false',
        '12345',
        new Date() + 7
      )
    );
  }
}
