import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import InMemoryUserRepository from '../inMemory/InMemoryUserRepository.mjs';
import InMemoryRoleRepository from '../inMemory/InMemoryRoleRepository.mjs';
import { michael } from '../../../model/mock/Users.mjs';
import { superuser } from '../../../model/mock/Roles.mjs';

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
    await this.RoleRepository.add(superuser);
    await this.UserRepository.add(michael);
  }

  async dropDatabase() {
    await this.UserRepository.clear();
    await this.RoleRepository.clear();
  }
}
