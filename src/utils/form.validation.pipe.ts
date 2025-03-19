import {
  ArgumentMetadata,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { R } from '../interfaces/r';

export class FormValidationPipe extends ValidationPipe {
  private static isProduction = process.env.NODE_ENV === 'production';
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      const code = e.getStatus();
      if (e instanceof HttpException) {
        const response = e.getResponse() as { message?: any };
        if (response.message && Array.isArray(response.message)) {
          throw new HttpException(
            R.error(
              'ER_REQUEST_VALIDATION',
              code,
              FormValidationPipe.isProduction ? null : response.message[0],
            ),
            e.getStatus(),
          );
        } else {
          throw new HttpException(
            R.error(
              'ER_REQUEST_VALIDATION',
              code,
              FormValidationPipe.isProduction ? null : response.message,
            ),
            code,
          );
        }
      }

      throw e;
    }
  }
}
