import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { LicencesService } from './licences.service';
import { R } from '../../interfaces/r';
import { LicenceSaveDto } from './dto/licence.save.dto';
import { User } from '../decorators/user';
import { UserEntity } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponsePageResult, ApiResponseResult } from '../decorators';
import { instanceToPlain } from 'class-transformer';
import { LicenceVo } from './vos/licence.vo';
import { LicencePageDto } from './dto/licence.page.dto';

@UseGuards(AuthGuard)
@Controller({ path: 'licences' })
@ApiOkResponse({ description: 'Ok' })
@ApiCreatedResponse({ description: 'Created' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiExtraModels(LicenceVo)
export class LicencesController {
  constructor(private service: LicencesService) {}

  @Get('list')
  @ApiOperation({ description: 'licence列表', tags: ['licence管理'] })
  @ApiResponsePageResult(LicenceVo)
  public async list(@Query() params: LicencePageDto) {
    const data = await this.service.findPage(params);
    return R.page(data);
  }

  @Get('info/:uuid')
  @ApiOperation({ description: 'licence详情', tags: ['licence管理'] })
  @ApiResponseResult(LicenceVo)
  public async info(@Param('uuid') uuid: string) {
    const data = await this.service.findOneByOrFail({ uuid });
    return R.ok(instanceToPlain(data));
  }

  @Get('validate/:uuid')
  @ApiOperation({ description: 'licence验证', tags: ['licence管理'] })
  @ApiResponseResult(LicenceVo)
  public async validate(@Param('uuid') uuid: string) {
    const data = await this.service.validate({ uuid });
    return R.ok(instanceToPlain(data));
  }

  @Delete('delete/:uuid')
  @ApiOperation({ description: '删除licence', tags: ['licence管理'] })
  @ApiResponseResult(Boolean)
  public async delete(@Param('uuid') uuid: string) {
    const res = await this.service.remove(uuid);
    return R.ok(res.affected != null && res.affected > 0);
  }

  @Post('save')
  @ApiOperation({ description: '创建licence', tags: ['licence管理'] })
  public async save(@Body() dto: LicenceSaveDto, @User() user: UserEntity) {
    const entity = await this.service.save({
      ...dto,
      createId: user.id,
    });
    return R.ok(entity);
  }
}
