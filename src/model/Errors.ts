export class GeneralError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends GeneralError {
  body: { [key: string]: string }[];
  constructor(body: { [key: string]: string }[]) {
    super(400, 'Validation Error');
    this.body = body;
  }
}

export class ConflictError extends GeneralError {
  constructor(target: string) {
    const message = `${target} already exists`;
    super(409, message);
  }
}

export class NotFoundError extends GeneralError {
  constructor(target: string) {
    const message = `${target} is not found`;
    super(404, message);
  }
}

export class ForbiddenError extends GeneralError {
  constructor(message: string) {
    super(403, message);
  }
}
