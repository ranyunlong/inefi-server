import { Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @Type()
  @IsNotEmpty()
  @Length(6, 18)
  @ApiProperty({ description: '用户名' })
  public username: string;

  @Type()
  @IsNotEmpty()
  @IsMobilePhone()
  @ApiProperty({ description: '手机' })
  public phone: string;
  @Type()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  public email: string;

  @Type()
  @ApiProperty({ description: '性别', enum: [0, 1, 2], nullable: true })
  public gender?: number;

  @Type()
  @IsNotEmpty()
  @Length(6, 18)
  @ApiProperty({ description: '用户密码' })
  public password: string;
}
