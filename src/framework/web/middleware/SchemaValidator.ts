import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../util/Logger';
import handleValidationError from '../../validation/HandleValidationError';
import Schemas from '../../validation/index';

const supportedMethods = ['post', 'put'];
const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const baseUrl = req.baseUrl.split('/', 3)[2];
  const route = baseUrl + req.route.path;
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
