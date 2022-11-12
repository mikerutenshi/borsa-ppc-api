export const Status = new Map([
  [200, 'OK'],
  [201, 'Created'],
  [400, 'Bad Request'],
  [409, 'Conflict'],
  [404, 'Not Found'],
  [403, 'Forbidden'],
  [500, 'Internal Server Error'],
]);

export class Response {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

export class successfulResponse extends Response {
  constructor(data, message) {
    super(Status.get(200), data, message);
  }
}
