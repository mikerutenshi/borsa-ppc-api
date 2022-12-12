import Role from '../../model/Role';
import CrudRepository from './CrudRepository';

export default interface RoleRepository extends CrudRepository<Role> {}
