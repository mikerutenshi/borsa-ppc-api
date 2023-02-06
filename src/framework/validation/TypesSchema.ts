import Joi from 'joi';
import { nameSchema } from './CommonSchema';

const typesSchema = Joi.object().keys({
  name: nameSchema,
});

export { typesSchema };
