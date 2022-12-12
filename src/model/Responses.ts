import { Status } from './Enums';

class GeneralResponse {
  status: string;
  data?: [];
  message: string;
  constructor(status: string, message: string, data?: []) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

class SuccessfulResponse extends GeneralResponse {
  constructor(data: [], message: string) {
    super(Status.get(200) || 'OK', message, data);
  }
}

export { GeneralResponse, SuccessfulResponse };
