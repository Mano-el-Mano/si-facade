import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ApiException } from '../exceptions/api-exception';
import { Request, Response } from 'express';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack: exception.stack,
      internalErrorMessage: exception.internalErrorMessage,
      msg: exception.getResponse().toString(),
    };
    if (process.env.NODE_ENV === 'production') {
      response.status(status).json({
        status: body.statusCode,
        msg: body.msg,
        timestamp: body.timestamp,
      });
    } else {
      response.status(status).json(body);
    }
  }
}
