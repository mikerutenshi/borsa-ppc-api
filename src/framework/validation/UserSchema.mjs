import Joi from 'joi';

const idSchema = Joi.number().integer().positive().required();

export const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).required(),
  first_name: Joi.string().min(3).max(16).required(),
  last_name: Joi.string().min(3).max(32),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  role_id: idSchema,
  is_active: Joi.boolean(),
});
