import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { EdgeEntity } from './entities/edge.entity';
import { PageInfo } from '../../interfaces/page-info';
import { EdgePageDto } from './dto/edge.page.dto';
import { v4 } from 'uuid';

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(EdgeEntity)
    private repository: Repository<EdgeEntity>,
  ) {}

  /**
   * 分页查询
   * @param params
   */
  public async findPage(params: EdgePageDto): Promise<PageInfo<EdgeEntity>> {
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
    const where: FindOptionsWhere<EdgeEntity> = {
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
      list: instanceToPlain(list) as EdgeEntity[],
    };
  }

  /**
   * 新增网关
   * @param user
   */
  public async save(user: Partial<EdgeEntity>) {
    const entity = plainToInstance(EdgeEntity, {
      ...user,
      uuid: v4(),
    });
    return await this.repository.save(entity);
  }

  /**
   * 查询边缘网关
   * @param where
   */
  public findOne(where: Partial<EdgeEntity>): Promise<EdgeEntity | null> {
    return this.repository.findOne({ where });
  }

  /**
   * 查询边缘网关
   * @param where
   */
  public findOneByOrFail(where: Partial<EdgeEntity>) {
    return this.repository.findOneByOrFail(where);
  }

  /**
   * 修改边缘网关
   * @param uuid
   * @param dto
   */
  public update(uuid: string, dto: Partial<EdgeEntity>) {
    return this.repository.update({ uuid }, dto);
  }

  /**
   * 删除边缘网关
   * @param uuid
   */
  public async remove(uuid: string) {
    return await this.repository.delete({ uuid });
  }

  /**
   * 批量删除边缘网关
   * @param id
   */
  public async delete(id: number | number[]) {
    return await this.repository.delete(id);
  }
}
