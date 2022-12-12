import { AuthParam, User } from '../../model/Users';
import CrudRepository from './CrudRepository';

interface UserRepository extends CrudRepository<User> {
  createAuth(instance: AuthParam): Promise<User>;
}

export default UserRepository;
