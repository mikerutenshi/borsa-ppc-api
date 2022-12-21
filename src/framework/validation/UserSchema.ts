import Joi from 'joi';
import { idSchema } from './CommonSchema';

export const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).required(),
  first_name: Joi.string().min(3).max(16).required(),
  last_name: Joi.string().min(3).max(32),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
  role_id: idSchema,
  is_active: Joi.boolean(),
});

export const loginSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});

export const refreshTokenSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).required(),
  refresh_token: Joi.string().length(256).required(),
});
