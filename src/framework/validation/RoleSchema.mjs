import Joi from 'joi';
import Roles from '../../model/Roles.mjs';

export const roleSchema = Joi.object().keys({
  name: Joi.string()
    .max(24)
    .min(6)
    .required()
    .valid(...Object.values(Roles)),
});
