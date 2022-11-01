import { ValidationError } from '../../../model/Error.mjs';
import { Response, Status } from '../../../model/Response.mjs';

const ErrorHandler = (err, _, res, __) => {
  if (err instanceof ValidationError) {
    res
      .status(err.status)
      .json(new Response(Status.get(err.status), err.body, err.message));
  }
  const status = err.status || 500;
  res
    .status(status)
    .json(new Response(Status.get(status), undefined, err.stack));
};

export default ErrorHandler;
