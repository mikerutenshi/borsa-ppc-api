import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import User from '../../../model/User.mjs';
import Role from '../../../model/Role.mjs';
import InMemoryUserRepository from '../inMemory/InMemoryUserRepository.mjs';
import InMemoryRoleRepository from '../inMemory/InMemoryRoleRepository.mjs';

export default class InMemoryDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.userRepository = new InMemoryUserRepository();
    this.roleRepository = new InMemoryRoleRepository();
  }

  async initDatabase() {
    //this.seedData();
  }

  async seedData() {
    let mockRole = new Role('superuser');
    mockRole = await this.roleRepository.add(mockRole);
    const user = new User(
      'michaelhs',
      'Michael',
      'Susanto',
      'kataKunci2022',
      mockRole.id,
      'false'
    );

    await this.userRepository.add(user);
  }
}
