import RoleRepository from './RoleRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  userRepository: UserRepository | null;
  roleRepository: RoleRepository | null;

  constructor() {
    this.userRepository = null;
    this.roleRepository = null;
  }

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
}

export default DatabaseService;
