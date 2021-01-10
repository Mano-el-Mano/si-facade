import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(
    description: string,
    status: number,
    internalErrorMessage?: string,
  ) {
    super(description, status);
    this.internalErrorMessage = internalErrorMessage;
  }
  log: boolean;
  logData: any;
  internalErrorMessage: string;
  logDescription: string;
  stack = Error().stack;
}
