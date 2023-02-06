import Joi from 'joi';
import { idSchema } from './CommonSchema';

const usernameSchema = Joi.string().min(3).max(16).required();
const passwordSchema = Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  .required();

const userSchema = Joi.object().keys({
  username: usernameSchema,
  first_name: Joi.string().min(3).max(16).required(),
  last_name: Joi.string().min(3).max(32),
  password: passwordSchema,
  role_id: idSchema,
  is_active: Joi.boolean(),
});

const loginSchema = Joi.object().keys({
  username: usernameSchema,
  password: passwordSchema,
});

const refreshTokenSchema = Joi.object().keys({
  username: usernameSchema,
  refresh_token: Joi.string().length(256).required(),
});

export { userSchema, loginSchema, refreshTokenSchema };
