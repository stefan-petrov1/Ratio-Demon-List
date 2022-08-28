export default class ServerError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message: string) {
    return new ServerError(message, 404);
  }

  static serverError() {
    return new ServerError('Internal Server Error', 500);
  }
}
