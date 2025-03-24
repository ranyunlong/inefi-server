import { OmitType } from '@nestjs/swagger';
import { EdgeEntity } from '../entities/edge.entity';

export class EdgeSaveDto extends OmitType(EdgeEntity, [
  'id',
  'uuid',
  'createId',
]) {}
