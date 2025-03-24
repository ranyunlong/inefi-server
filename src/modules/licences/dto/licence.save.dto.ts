import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class LicenceSaveDto {
  @Type()
  @IsInt()
  @ApiProperty({ description: '有效天数', required: true })
  public days: number;

  @Type()
  @IsString()
  @ApiProperty({ description: '设备序列号', required: true })
  public serialNumber: string;
}
