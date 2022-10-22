import { ValidationError } from '../../model/Error.mjs';

const handleValidationError = (error) => {
  const _error = {};
  for (const e of error.details) {
    _error[e.path] = e.message;
  }
  throw new ValidationError(_error);
};

export { handleValidationError };
