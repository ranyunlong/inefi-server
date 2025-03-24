import { PageDto } from '../../../interfaces/page.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DevicePageDto extends PageDto {
  @Type()
  @ApiProperty({ description: 'UUID', required: false })
  uuid?: string;

  @Type()
  @ApiProperty({
    description:
      '激活状态: 0.未激活; 1.激活中; 2.激活失败; 3.需要重新激活; 4.激活成功; -1.禁用',
    required: false,
  })
  status?: number;

  @Type()
  @ApiProperty({ description: '设备名称', required: false })
  public name: string;

  @Type()
  @ApiProperty({ description: '所属边缘设备', required: false })
  public edgeId: number;

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
