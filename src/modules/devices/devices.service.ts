import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import { PageInfo } from '../../interfaces/page-info';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DevicePageDto } from './dto/device.page.dto';
import { DeviceVo } from './vos/device.vo';
import { v4 } from 'uuid';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceEntity)
    private repository: Repository<DeviceEntity>,
  ) {}

  /**
   * 分页查询
   * @param params
   */
  public async findPage(params: DevicePageDto): Promise<PageInfo<DeviceVo>> {
    const {
      uuid,
      status,
      createAtBegin,
      createAtEnd,
      updateAtEnd,
      updateAtBegin,
      pageSize,
      page,
      name,
    } = params;
    const where: FindOptionsWhere<DeviceEntity> = {
      uuid,
      status,
    };

    Object.keys(where).forEach((k) => {
      if (where[k] === undefined) {
        delete where[k];
      }
    });

    if (name) {
      where.name = Like(`%${name}%`);
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
      list: instanceToPlain(list) as DeviceEntity[],
    };
  }

  /**
   * 新增设备
   * @param user
   */
  public async save(user: Partial<DeviceEntity>) {
    const uuid = v4();

    const entity = plainToInstance(DeviceEntity, {
      ...user,
      uuid,
    });
    return await this.repository.save(entity);
  }

  /**
   * 查询设备
   * @param where
   */
  public findOne(where: Partial<DeviceEntity>): Promise<DeviceEntity | null> {
    return this.repository.findOne({ where });
  }

  /**
   * 查询设备
   * @param where
   */
  public findOneByOrFail(where: Partial<DeviceEntity>) {
    return this.repository.findOneByOrFail(where);
  }

  /**
   * 修改设备
   * @param uuid
   * @param dto
   */
  public update(uuid: string, dto: Partial<DeviceEntity>) {
    return this.repository.update({ uuid }, dto);
  }

  /**
   * 删除设备
   * @param uuid
   */
  public async remove(uuid: string) {
    return await this.repository.delete({ uuid });
  }

  /**
   * 删除设备
   * @param id
   */
  public async delete(id: number | number[]) {
    return await this.repository.delete(id);
  }
}
