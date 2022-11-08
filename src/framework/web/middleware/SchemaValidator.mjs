import { ValidationError } from '../../../model/Error.mjs';
import { Response, Status } from '../../../model/Response.mjs';
import { handleValidationError } from '../../validation/HandleValidationError.mjs';
import Schemas from '../../validation/index.mjs';

const supportedMethods = ['post', 'put'];
const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export const SchemaValidator = (req, _, next) => {
  const baseUrl = req.baseUrl.split('/', 3)[2];
  const route = baseUrl + req.route.path;
  console.log('route', route);
  const method = req.method.toLowerCase();

  if (supportedMethods.includes(method) && Schemas.hasOwnProperty(route)) {
    const schema = Schemas[route];
    const { value, error } = schema.validate(req.body, validationOptions);

    if (error) {
      handleValidationError(error);
    } else {
      req.body = value;
      next();
    }
  } else {
    next();
  }
};
