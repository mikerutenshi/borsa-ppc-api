import Joi from 'joi';
import { Roles } from '../../model/Enums';

export const roleSchema = Joi.object().keys({
  name: Joi.string()
    .max(24)
    .min(6)
    .required()
    .valid(...Object.values(Roles)),
});
