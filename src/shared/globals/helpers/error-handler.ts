import HTTP_STATUS from 'http-status-codes';

export interface IErrorresponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  //defining abstract properties what this means is any
  //other class that extends this abstract class will have
  //to define this property

  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    //what this means is that whatever is defined in the
    //Error constructor will be made available in our customError class
    super(message);
  }

  serializeErrors(): IError {
    return {
      //this message is the message we are passing
      message: this.message,

      //this status and status codes aref coming from
      //the Error class
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

export class JoiRequestValidationError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.NOT_FOUND;
  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  status = 'error';
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  constructor(message: string) {
    super(message);
  }
}
