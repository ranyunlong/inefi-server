import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm/error/TypeORMError';
import { Request, Response } from 'express';

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeormExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`${request.url} ${exception.name}:${exception.message}`);

    response.status(code);

    if (process.env.NODE_ENV === 'production') {
      response.json({
        code,
        message: exception.driverError.code,
        timestamp: Date.now(),
      });
    } else {
      response.json({
        code: exception.driverError.code,
        message: exception.driverError.code,
        path: request.url,
        timestamp: Date.now(),
      });
    }
  }
}
