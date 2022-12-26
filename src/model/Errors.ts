export class GeneralError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  prefixMes(prefix: string) {
    this.message = prefix + ' ' + this.message;
  }

  suffixMes(suffix: string) {
    this.message = this.message + ' ' + suffix;
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
  constructor(prefix?: string, suffix?: string) {
    super(409, `${prefix} already exists ${suffix}`);
  }
}

export class NotFoundError extends GeneralError {
  constructor(prefix?: string, suffix?: string) {
    super(404, `${prefix} not found ${suffix}`);
  }
}

export class ForbiddenError extends GeneralError {
  constructor(message?: string) {
    super(403, `Forbidden. ${message}`);
  }
}
