import Joi from 'joi';
import { idSchema, nameSchema } from './CommonSchema';

const typesSchema = Joi.object().keys({
  name: nameSchema,
});

const productCategoryTypeSchema = Joi.object().keys({
  name: nameSchema,
  parent_id: idSchema.allow(null),
});

export { typesSchema, productCategoryTypeSchema };
