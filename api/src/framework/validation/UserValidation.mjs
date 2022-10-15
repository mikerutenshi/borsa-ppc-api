import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(6).max(16).required(),
  first_name: Joi.string().min(6).max(16).required(),
  last_name: Joi.string().min(6).max(32),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
});
