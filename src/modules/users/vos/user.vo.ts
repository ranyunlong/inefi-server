import { UserEntity } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UserVo extends OmitType(UserEntity, ['id', 'password']) {}
