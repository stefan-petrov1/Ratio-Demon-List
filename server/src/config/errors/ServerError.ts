export default class ServerError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message: string) {
    return new ServerError(message, 400);
  }

  static unauthorized(message: string) {
    return new ServerError(message, 401);
  }

  static forbidden(message: string) {
    return new ServerError(message, 403);
  }

  static serverError() {
    return new ServerError('Internal Server Error', 500);
  }
}
