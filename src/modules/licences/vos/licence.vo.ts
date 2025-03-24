import { OmitType } from '@nestjs/swagger';
import { LicenceEntity } from '../entities/licence.entity';

export class LicenceVo extends OmitType(LicenceEntity, ['id']) {}
