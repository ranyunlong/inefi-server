import { OmitType } from '@nestjs/swagger';
import { DeviceEntity } from '../entities/device.entity';

export class DeviceVo extends OmitType(DeviceEntity, ['id']) {}
