import Joi from 'joi';
import { idSchema } from './CommonSchema';

const labourCostSchema = Joi.object().keys({
  product_group_id: idSchema,
  job_type_id: idSchema,
  cost: Joi.number().integer().positive().required(),
});

export { labourCostSchema };
