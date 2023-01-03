import Joi from 'joi';

const typesSchema = Joi.object().keys({
  name: Joi.string().max(24).min(2).required(),
});

export { typesSchema };
