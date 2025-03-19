import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { UserEntity } from '../user.entity';

export class UserUpdateDto extends OmitType(UserEntity, [
  'id',
  'uuid',
  'password',
  'createAt',
  'updateAt',
  'createId',
]) {
  @Exclude()
  id: number;

  @Exclude()
  createId: number;

  @Exclude()
  uuid: string;

  @Exclude()
  pwd?: string;

  @Exclude()
  createAt: Date;

  @Exclude()
  updateAt?: Date;

  @ApiProperty({
    description: '账号',
    required: false,
  })
  @Type()
  username: string;
}
