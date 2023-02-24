import Joi from 'joi';
import { idSchema, nameSchema } from './CommonSchema';

const productSchema = Joi.object().keys({
  code: nameSchema,
  product_group_id: idSchema,
  attributes: Joi.object()
    .required()
    .keys({
      colors: Joi.array().items(nameSchema),
    }),
});

export { productSchema };
