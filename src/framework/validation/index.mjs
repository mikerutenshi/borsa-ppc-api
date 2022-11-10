import { roleSchema } from './RoleSchema.mjs';
import { loginSchema, refreshTokenSchema, userSchema } from './UserSchema.mjs';

export default {
  'roles/': roleSchema,
  'users/': userSchema,
  'users/authenticate': loginSchema,
  'users/:id': userSchema,
  'users/refresh-access-token': refreshTokenSchema,
};
