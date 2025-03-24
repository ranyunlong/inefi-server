import { OmitType } from '@nestjs/swagger';
import { EdgeEntity } from '../entities/edge.entity';

export class EdgeUpdateDto extends OmitType(EdgeEntity, [
  'id',
  'uuid',
  'createAt',
  'updateAt',
  'createId',
]) {}
