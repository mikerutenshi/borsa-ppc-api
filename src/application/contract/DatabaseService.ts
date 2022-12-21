import RoleRepository from './RoleRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  userRepository!: UserRepository;
  roleRepository!: RoleRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
}

export default DatabaseService;
