import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { v4 } from 'uuid';

import { UserEntity } from './user.entity';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { PageInfo } from '../../interfaces/page-info';
import { UserVo } from './vos/user.vo';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserPageDto } from './dto/user.page.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  /**
   * 分页查询
   * @param params
   */
  public async findPage(params: UserPageDto): Promise<PageInfo<UserVo>> {
    const {
      uuid,
      status,
      gender,
      username,
      phone,
      createAtBegin,
      createAtEnd,
      updateAtEnd,
      updateAtBegin,
      pageSize,
      page,
    } = params;
    const where: FindOptionsWhere<UserEntity> = {
      uuid,
      status,
      gender,
    };

    Object.keys(where).forEach((k) => {
      if (where[k] === undefined) {
        delete where[k];
      }
    });

    if (username) {
      where.username = Like(`%${username}%`);
    }

    if (phone) {
      where.phone = Like(`%${phone}%`);
    }

    if (createAtBegin && createAtEnd) {
      where.createAt = Between(createAtBegin, createAtEnd);
    } else if (createAtBegin) {
      where.createAt = MoreThanOrEqual(createAtBegin);
    } else if (createAtEnd) {
      where.createAt = LessThanOrEqual(createAtEnd);
    }

    if (updateAtBegin && updateAtEnd) {
      where.updateAt = Between(updateAtBegin, updateAtEnd);
    } else if (updateAtBegin) {
      where.updateAt = MoreThanOrEqual(updateAtBegin);
    } else if (updateAtEnd) {
      where.updateAt = LessThanOrEqual(updateAtEnd);
    }

    const [list, total] = await this.repository
      .createQueryBuilder()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .where(where)
      .select()
      .getManyAndCount();

    return {
      page: params.page,
      pageSize: params.pageSize,
      total,
      list: instanceToPlain(list) as UserEntity[],
    };
  }

  /**
   * 保存用户
   * @param user
   */
  public async save(user: Partial<UserEntity>) {
    if (!user.password) throw new Error('Password is required');
    const uuid = v4();
    const pwd = crypto
      .createHmac('md5', uuid)
      .update(user.password)
      .digest('hex');
    const userEntity = plainToInstance(UserEntity, {
      ...user,
      uuid,
      gender: user.gender || 2,
      pwd,
    });
    return await this.repository.save(userEntity);
  }

  /**
   * 查询用户
   * @param uuid
   */
  public findOne(uuid: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { uuid } });
  }

  /**
   * 修改用户
   * @param uuid
   * @param dto
   */
  public update(uuid: string, dto: Partial<UserEntity>) {
    return this.repository.update({ uuid }, dto);
  }

  /**
   * 删除用户
   * @param uuid
   */
  public async remove(uuid: string) {
    return await this.repository.delete({ uuid });
  }

  /**
   * 登录
   * @param account
   * @param password
   */
  public async signIn(account: string, password: string) {
    const find = await this.repository.findOneByOrFail([
      { username: account },
      { phone: account },
    ]);
    const pwd = crypto
      .createHmac('md5', find.uuid)
      .update(password)
      .digest('hex');

    if (find.password === pwd) {
      return find;
    }
    return null;
  }
}
