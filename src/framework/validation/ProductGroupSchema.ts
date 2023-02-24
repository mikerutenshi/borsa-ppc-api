import Joi from 'joi';
import { codeSchema, idSchema, nameSchema } from './CommonSchema';

const productGroupSchema = Joi.object().keys({
  code: codeSchema,
  name: nameSchema,
  product_category_id: idSchema,
});

export { productGroupSchema };
