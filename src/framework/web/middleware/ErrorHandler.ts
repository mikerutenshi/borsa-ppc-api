import { NextFunction, Request, Response } from 'express';
import { Status } from '../../../model/Enums';
import { GeneralError, ValidationError } from '../../../model/Errors';
import { GeneralResponse } from '../../../model/Responses';

const ErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    const statusName = Status.get(err.statusCode) || 'Unregistered Status';
    res
      .status(err.statusCode)
      .json(new GeneralResponse(statusName, err.message, err.body as []));
  } else if (err instanceof GeneralError) {
    const statusName = Status.get(err.statusCode) || 'Unregistered Status';
    res
      .status(err.statusCode)
      .json(new GeneralResponse(statusName, err.message));
  } else {
    const statusName = Status.get(500) || 'Unregistered Status';
    res.status(500).json(new GeneralResponse(statusName, err.message));
  }
};

export default ErrorHandler;
