import { NextFunction, Request, Response } from 'express';
import config from '../../../../config/config';
import { Status } from '../../../model/Enums';
import { GeneralError, ValidationError } from '../../../model/Errors';
import { GeneralResponse } from '../../../model/Responses';

const ErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = (err as GeneralError).statusCode as keyof typeof Status;
  if (err instanceof ValidationError) {
    const statusName = Status[statusCode];
    res
      .status(err.statusCode)
      .json(new GeneralResponse(statusName, err.message, err.body as []));
  } else if (err instanceof GeneralError) {
    res
      .status(err.statusCode)
      .json(new GeneralResponse(Status[statusCode], err.message));
  } else {
    let errorMsg;

    if (config.nodeEnv !== 'production') {
      errorMsg = err.stack!;
    } else {
      errorMsg = err.message;
    }

    res.status(500).json(new GeneralResponse(Status[statusCode], errorMsg));
  }
};

export default ErrorHandler;
