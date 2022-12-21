import Joi from 'joi';

export const idSchema = Joi.number().integer().positive().required();

export const typesSchema = Joi.object().keys({
  name: Joi.string().min(3).max(64).required(),
});
