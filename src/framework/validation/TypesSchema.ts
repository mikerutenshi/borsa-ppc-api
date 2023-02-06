import Joi from 'joi';
import { nameSchema } from './CommonSchema';

const typesSchema = Joi.object().keys({
  name: nameSchema,
});

const productCategoryTypeSchema = Joi.object().keys({
  name: nameSchema,
  parent_id: Joi.number().integer().positive().required().allow(null),
});

export { typesSchema, productCategoryTypeSchema };
