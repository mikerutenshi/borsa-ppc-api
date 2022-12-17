import { Status } from './Enums';

class GeneralResponse<T> {
  status: string;
  data?: T[];
  message: string;
  constructor(status: string, message: string, data?: T[]) {
    data = data?.flatMap((d) => (!!d ? [d] : []));
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

class SuccessfulResponse<T> extends GeneralResponse<T> {
  constructor(message: string, data?: T[]) {
    super(Status[200], message, data);
  }
}

export { GeneralResponse, SuccessfulResponse };
