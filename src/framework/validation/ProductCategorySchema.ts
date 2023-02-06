import Joi from 'joi';
import { idSchema, nameSchema } from './CommonSchema';

export const productCategorySchema = Joi.object().keys({
  name: nameSchema,
  product_category_type_id: idSchema,
  parent_id: idSchema.allow(null),
});
