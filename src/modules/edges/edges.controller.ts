import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { EdgeVo } from './vos/edge.vo';
import { EdgesService } from './edges.service';
import { ApiResponsePageResult, ApiResponseResult } from '../decorators';
import { R } from '../../interfaces/r';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { EdgePageDto } from './dto/edge.page.dto';
import { EdgeSaveDto } from './dto/edge.save.dto';
import { EdgeUpdateDto } from './dto/edge.update.dto';
import { User } from '../decorators/user';
import { UserEntity } from '../users/entities/user.entity';

@Controller({ path: 'edges' })
@ApiOkResponse({ description: 'Ok' })
@ApiCreatedResponse({ description: 'Created' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiExtraModels(EdgeVo)
@UseGuards(AuthGuard)
export class EdgesController {
  constructor(private service: EdgesService) {}

  @Get('list')
  @ApiOperation({ description: '边缘网关列表', tags: ['边缘网关管理'] })
  @ApiResponsePageResult(EdgeVo)
  public async list(@Query() params: EdgePageDto) {
    const data = await this.service.findPage(params);
    return R.page(data);
  }

  @Get('info/:uuid')
  @ApiOperation({ description: '边缘网关详情', tags: ['边缘网关管理'] })
  @ApiResponseResult(EdgeVo)
  public async info(@Param('uuid') uuid: string) {
    const data = await this.service.findOne({ uuid });
    return R.ok(instanceToPlain(data));
  }

  @Delete('delete/:uuid')
  @ApiOperation({ description: '删除边缘网关', tags: ['边缘网关管理'] })
  @ApiResponseResult(Boolean)
  public async delete(@Param('uuid') uuid: string) {
    const res = await this.service.remove(uuid);
    return R.ok(res.affected != null && res.affected > 0);
  }

  @Put('update/:uuid')
  @ApiOperation({ description: '修改边缘网关', tags: ['边缘网关管理'] })
  @ApiResponseResult(Boolean)
  public async update(@Body() dto: EdgeUpdateDto, @Param('uuid') uuid: string) {
    const res = await this.service.update(
      uuid,
      plainToInstance(EdgeUpdateDto, dto) as any,
    );
    return R.ok(res.affected != null && res.affected > 0);
  }

  @Post('save')
  @ApiOperation({ description: '添加边缘网关', tags: ['边缘网关管理'] })
  @ApiResponseResult(EdgeVo)
  public async save(@Body() dto: EdgeSaveDto, @User() reqUser: UserEntity) {
    const user = await this.service.save({ ...dto, createId: reqUser.id });
    return R.ok(instanceToPlain(user));
  }
}
