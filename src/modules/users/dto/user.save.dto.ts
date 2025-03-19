import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UserSaveDto extends OmitType(UserEntity, ['id', 'uuid']) {}
