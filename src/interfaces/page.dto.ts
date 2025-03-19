import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class PageDto {
  @Type(() => Number)
  @Max(100)
  @Min(1)
  @ApiProperty({ description: 'Current page count' })
  public pageSize: number = 10;

  @Type(() => Number)
  @Min(1)
  @ApiProperty({ description: 'Page number' })
  public page: number = 1;
}
