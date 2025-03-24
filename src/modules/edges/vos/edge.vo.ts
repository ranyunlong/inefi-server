import { OmitType } from '@nestjs/swagger';
import { EdgeEntity } from '../entities/edge.entity';

export class EdgeVo extends OmitType(EdgeEntity, ['id']) {}
