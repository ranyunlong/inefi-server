import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserSaveDto extends OmitType(UserEntity, ['id', 'uuid']) {}
