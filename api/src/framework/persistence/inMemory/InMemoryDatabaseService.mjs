import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import User from '../../../model/User.mjs';
import Role from '../../../model/Role.mjs';
import Roles from '../../../model/Roles.mjs';
import InMemoryUserRepository from '../inMemory/InMemoryUserRepository.mjs';
import InMemoryRoleRepository from '../inMemory/InMemoryRoleRepository.mjs';

export default class InMemoryDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.UserRepository = new InMemoryUserRepository();
    this.RoleRepository = new InMemoryRoleRepository();
  }

  async initDatabase() {
    this.seedData();
  }

  async seedData() {
    let mockRole = new Role(Roles.superuser);
    mockRole = await this.RoleRepository.add(mockRole);
    const user = new User(
      'michaelhs',
      'Michael',
      'Susanto',
      'kataKunci2022',
      mockRole.id,
      'false'
    );

    await this.UserRepository.add(user);
  }

  async clearDatabase() {
    await this.UserRepository.clear();
    await this.RoleRepository.clear();
  }
}
