import Joi from 'joi';
import { idSchema, nameSchema } from './CommonSchema';

const materialSchema = Joi.object().keys({
  name: nameSchema,
  material_group_id: idSchema,
  attributes: Joi.object()
    .required()
    .keys({
      colors: Joi.array().items(nameSchema),
      sizes: Joi.array().items(Joi.number().positive().greater(0).precision(1)),
    }),
});

export { materialSchema };
