import { OmitType } from '@nestjs/swagger';
import { DeviceEntity } from '../entities/device.entity';

export class DeviceSaveDto extends OmitType(DeviceEntity, ['id', 'uuid']) {}
