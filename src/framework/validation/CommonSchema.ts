import Joi from 'joi';

const idSchema = Joi.number().integer().positive().required();
const nameSchema = Joi.string().min(2).max(32).required();
const codeSchema = Joi.string().min(2).max(8).required();

export { idSchema, nameSchema, codeSchema };
