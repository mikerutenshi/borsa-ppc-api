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
