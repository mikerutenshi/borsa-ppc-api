export class ValidationError extends Error {
  constructor(body) {
    super('Validation Error');
    this.body = body;
    this.status = 400;
  }
}

export class GenericError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
  }
}

export class ConflictError extends Error {
  constructor(target) {
    const message = `${target} already exists`;
    super(message);
    this.status = 409;
  }
}

export class NotFoundError extends Error {
  constructor(target) {
    const message = `${target} is not found`;
    super(message);
    this.status = 404;
  }
}

export class ForbiddenError extends GenericError {
  constructor(message) {
    const statusCode = 403;
    super(statusCode, message);
  }
}
