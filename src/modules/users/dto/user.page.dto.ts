import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { PageDto } from '../../../interfaces/page.dto';

export class UserPageDto extends PageDto {
  @Type()
  @ApiProperty({ description: '账号', required: false })
  username?: string;

  @Type()
  @ApiProperty({ description: '手机', required: false })
  phone?: string;

  @Type()
  @ApiProperty({ description: 'UUID', required: false })
  uuid?: string;

  @Column({
    type: 'int',
    comment: '性别:  0: 女; 1.男; 2: 其他;',
    default: 2,
  })
  @ApiProperty({ description: '性别:  0: 女; 1.男; 2: 其他;', required: false })
  gender?: number;

  @Type()
  @ApiProperty({
    description:
      '激活状态: 0.未激活; 1.激活中; 2.激活失败; 3.需要重新激活; 4.激活成功; -1.禁用',
    required: false,
  })
  status?: number;

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
