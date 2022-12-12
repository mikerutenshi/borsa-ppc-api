import { ObjectSchema } from 'joi';
import { roleSchema } from './RoleSchema';
import { loginSchema, refreshTokenSchema, userSchema } from './UserSchema';

type JoiSchema = {
  [route: string]: ObjectSchema<any>;
};

const schemaMap: JoiSchema = {};

schemaMap['roles/'] = roleSchema;
schemaMap['roles/:id'] = roleSchema;
schemaMap['users/'] = userSchema;
schemaMap['users/authenticate'] = loginSchema;
schemaMap['users/:id'] = userSchema;
schemaMap['users/refresh-access-token'] = refreshTokenSchema;

export default schemaMap;
