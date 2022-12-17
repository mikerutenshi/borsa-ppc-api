import { Roles } from '../Enums';
import Role from '../Role';

export const superuser = new Role(Roles.superuser);
export const production = new Role(Roles.production);
export const finance = new Role(Roles.finance);
export const invalidRole = new Role('invalid');
