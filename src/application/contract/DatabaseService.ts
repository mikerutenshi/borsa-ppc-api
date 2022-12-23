import RoleRepository from './RoleRepository';
import TypeRepository from './TypeRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  userRepository!: UserRepository;
  roleRepository!: RoleRepository;
  typeRepository!: TypeRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
}

export default DatabaseService;
