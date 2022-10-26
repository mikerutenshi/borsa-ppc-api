const Status = {
  ok: 'OK',
  created: 'Created',
  badRequest: 'Bad Request',
  conflict: 'Conflict',
  notFound: 'Not Found',
};
class Response {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

export { Status, Response };
