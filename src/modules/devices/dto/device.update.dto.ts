import { OmitType } from '@nestjs/swagger';
import { DeviceEntity } from '../entities/device.entity';

export class DeviceUpdateDto extends OmitType(DeviceEntity, [
  'id',
  'uuid',
  'createAt',
  'updateAt',
  'createId',
]) {}
