import Joi from 'joi';
import { idSchema, nameSchema } from './CommonSchema';

const materialGroupSchema = Joi.object().keys({
  name: nameSchema,
  material_typeid: idSchema,
});

export { materialGroupSchema };
