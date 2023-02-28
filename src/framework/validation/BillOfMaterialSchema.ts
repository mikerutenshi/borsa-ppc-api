import Joi from 'joi';
import { idSchema } from './CommonSchema';

const billOfMaterialSchema = Joi.object().keys({
  product_id: idSchema,
  material_id: idSchema,
  qty_req: Joi.number().precision(2).greater(0).positive().required(),
});

export { billOfMaterialSchema };
