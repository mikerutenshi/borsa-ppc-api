import { ObjectSchema } from 'joi';
import { billOfMaterialSchema } from './BillOfMaterialSchema';
import { labourCostSchema } from './LabourCostSchema';
import { materialGroupSchema } from './MaterialGroupSchema';
import { materialSchema } from './MaterialSchema';
import { productCategorySchema } from './ProductCategorySchema';
import { productGroupSchema } from './ProductGroupSchema';
import { productSchema } from './ProductSchema';
import { roleSchema } from './RoleSchema';
import { productCategoryTypeSchema, typesSchema } from './TypesSchema';
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
  'product-category-types/:id': productCategoryTypeSchema,
  'product-category-types/': productCategoryTypeSchema,
  'job-types/': typesSchema,
  'job-types/:id': typesSchema,
  'material-types/': typesSchema,
  'material-types/:id': typesSchema,
  'sizes/': typesSchema,
  'sizes/:id': typesSchema,
  'colors/': typesSchema,
  'colors/:id': typesSchema,
  'product-groups/': productGroupSchema,
  'product-groups/:id': productGroupSchema,
  'products/': productSchema,
  'products/:id': productSchema,
  'material-groups/': materialGroupSchema,
  'material-groups/:id': materialGroupSchema,
  'materials/': materialSchema,
  'materials/:id': materialSchema,
  'labour-costs/': labourCostSchema,
  'labour-costs/:id': labourCostSchema,
  'bill-of-materials/': billOfMaterialSchema,
  'bill-of-materials/:id': billOfMaterialSchema,
};

export default schemaMap;
