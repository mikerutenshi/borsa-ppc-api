class ValidationError extends Error {
  constructor(body) {
    super('Validation Error');
    this.body = body;
    this.status = 400;
  }
}

export { ValidationError };
