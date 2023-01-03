import { ObjectSchema } from 'joi';
import { productCategorySchema } from './ProductCategorySchema';
import { roleSchema } from './RoleSchema';
import { typesSchema } from './TypesSchema';
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
  'job-types/': typesSchema,
  'job-types/:id': typesSchema,
  'material-types/': typesSchema,
  'material-types/:id': typesSchema,
  'sizes/': typesSchema,
  'sizes/:id': typesSchema,
  'colors/': typesSchema,
  'colors/:id': typesSchema,
};

export default schemaMap;
