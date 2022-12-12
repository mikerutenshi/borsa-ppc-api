import Role from '../Role';
import Roles from '../Roles';

export const superuser = new Role(Roles.superuser);
export const production = new Role(Roles.production);
export const finance = new Role(Roles.finance);
export const invalidRole = new Role('invalid');
