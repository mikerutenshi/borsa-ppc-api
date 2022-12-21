import Joi from 'joi';
import { idSchema } from './CommonSchema';

export const productCategorySchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  product_category_type_id: idSchema,
  parent_id: idSchema,
});
