import Joi from 'joi';
import Roles from '../../model/Roles.mjs';

const idSchema = Joi.number().integer().positive().required();

const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).required(),
  first_name: Joi.string().min(3).max(16).required(),
  last_name: Joi.string().min(3).max(32),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  role_id: idSchema,
  is_active: Joi.boolean().required(),
});

const roleSchema = Joi.object().keys({
  name: Joi.string()
    .max(24)
    .min(6)
    .required()
    .valid(...Object.values(Roles)),
});

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const validateUser = (userInstance) => {
  return userSchema.validate(userInstance, validationOptions);
};

const validateRole = (roleInstance) => {
  return roleSchema.validate(roleInstance, validationOptions);
};

export { validateUser, validateRole };
