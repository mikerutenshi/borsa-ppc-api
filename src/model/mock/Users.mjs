import Role from '../Role.mjs';
import Roles from '../Roles.mjs';
import User from '../User.mjs';

export const superuser = new Role(Roles.superuser);
export const production = new Role(Roles.production);
export const finance = new Role(Roles.finance);
export const invalidRole = new Role('invalid');

export const michael = new User(
  'michaelhs',
  'Michael',
  'Susanto',
  'kataKunci2021',
  1
);
export const christ = new User(
  'christkurnia',
  'Christ',
  'Kurnia',
  'kataKunci2022',
  1
);
export const christine = new User(
  'christine',
  'Christine',
  'Summerlyn',
  'kataKunci2023',
  3
);
export const phoebe = new User('phoebe', 'Phoebe', 'White', 'kataKunci2024', 2);
export const invalidUser = new User('in', 'fr', 'ls', 'pss', 0);
