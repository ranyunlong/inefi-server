import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PageInfo<T> {
  @Type(() => Number)
  @ApiProperty({ description: 'Total number of entries' })
  public total: number;

  @Type(() => Number)
  @ApiProperty({ description: 'Current page count' })
  public pageSize: number;

  @Type(() => Number)
  @ApiProperty({ description: 'Page number' })
  public page: number;

  @ApiProperty({ description: 'list' })
  public list: T[];
}
