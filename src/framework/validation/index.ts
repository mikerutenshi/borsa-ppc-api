import { ObjectSchema } from 'joi';
import { productCategorySchema } from './ProductCategorySchema';
import { roleSchema } from './RoleSchema';
import { loginSchema, refreshTokenSchema, userSchema } from './UserSchema';

type JoiSchema = {
  [route: string]: ObjectSchema<any>;
};

const schemaMap: JoiSchema = {
  'roles/': roleSchema,
  'roles/:id': roleSchema,
  'users/': userSchema,
  'users/authenticate': loginSchema,
  'users/:id': userSchema,
  'users/refresh-access-token': refreshTokenSchema,
  'product-categories/': productCategorySchema,
  'product-categories/:id': productCategorySchema,
};

export default schemaMap;
