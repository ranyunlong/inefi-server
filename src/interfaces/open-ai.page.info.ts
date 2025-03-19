import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OpenAIPageInfo<T> {
  @ApiProperty({ enum: ['list'] })
  @Type()
  object: 'list';

  @ApiProperty()
  @Type()
  data: T[];

  @ApiProperty({ nullable: true })
  @Type()
  first_id: string | null;

  @ApiProperty({ nullable: true })
  @Type()
  last_id: string | null;

  @ApiProperty()
  @Type()
  has_more: boolean;
}
