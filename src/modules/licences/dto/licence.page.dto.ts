import { PageDto } from '../../../interfaces/page.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LicencePageDto extends PageDto {
  @Type()
  @ApiProperty({ description: 'uuid', required: false })
  public uuid: string;

  @Type()
  @ApiProperty({ description: '创建时间范围开始', required: false })
  createAtBegin?: Date;

  @Type()
  @ApiProperty({ description: '创建时间范围结束', required: false })
  createAtEnd?: Date;

  @Type()
  @ApiProperty({ description: '更新时间范围开始', required: false })
  updateAtBegin?: Date;

  @Type()
  @ApiProperty({ description: '更新时间范围结束', required: false })
  updateAtEnd?: Date;
}
