import { ApiProperty } from '@nestjs/swagger';
import { PageInfo } from './page.info';
import { plainToInstance } from 'class-transformer';

export class R<T = any> {
  public static ok<T = any>(data: T) {
    const r = new R<T>();
    r.code = 200;
    r.message = 'OK';
    r.timestamp = Date.now();
    r.data = data;
    return r;
  }

  public static page<T>(info: PageInfo<T>) {
    return R.ok(plainToInstance<PageInfo<T>, PageInfo<T>>(PageInfo, info));
  }

  public static error<T = any>(message: string, code: number, data: T) {
    const r = new R<T>();
    r.code = code;
    r.message = message;
    r.timestamp = Date.now();
    r.data = data;
    return r;
  }

  @ApiProperty({ description: 'code' })
  code: number;

  @ApiProperty({ description: 'message' })
  message: string;

  @ApiProperty({ description: 'description' })
  description: string;

  @ApiProperty({ description: 'timestamp' })
  timestamp: number;

  @ApiProperty({ description: 'data' })
  data: T;
}
