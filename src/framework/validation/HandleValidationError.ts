import Joi from 'joi';
import { ValidationError } from '../../model/Errors';

const handleValidationError = (error: Joi.ValidationError) => {
  const errors = [];
  for (const e of error.details) {
    const errorItem: { [key: string]: string } = {};
    const key = e.path[0];

    errorItem[key] = e.message;
    errors.push(errorItem);
  }
  throw new ValidationError(errors);
};

export default handleValidationError;
