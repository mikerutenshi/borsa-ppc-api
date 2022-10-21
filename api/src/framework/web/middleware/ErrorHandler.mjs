import ValidationError from '../../../model/Error.mjs';
import { Response } from '../../../model/Response.mjs';

const ErrorHandler = (err, _, res, __) => {
  if (err instanceof ValidationError) {
    res
      .status(err.status)
      .json(new Response(err.status, err.body, err.message));
  }
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
};

export default ErrorHandler;
