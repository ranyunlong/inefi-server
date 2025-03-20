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
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserVo } from './vos/user.vo';
import { UsersService } from './users.service';
import { UserPageDto } from './dto/user.page.dto';
import { R } from '../../interfaces/r';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserSaveDto } from './dto/user.save.dto';
import { ApiResponsePageResult, ApiResponseResult } from '../decorators';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'users' })
@ApiOkResponse({ description: 'Ok' })
@ApiCreatedResponse({ description: 'Created' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiExtraModels(UserVo)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('list')
  @ApiOperation({ description: '用户列表', tags: ['用户'] })
  @ApiResponsePageResult(UserVo)
  public async list(@Query() params: UserPageDto) {
    const data = await this.service.findPage(params);
    return R.page(data);
  }

  @Get('info/:uuid')
  @ApiOperation({ description: '用户详情', tags: ['用户'] })
  @ApiResponseResult(UserVo)
  public async info(@Param('uuid') uuid: string) {
    const data = await this.service.findOne(uuid);
    return R.ok(instanceToPlain(data));
  }

  @Delete('delete/:uuid')
  @ApiOperation({ description: '用户详情', tags: ['用户'] })
  @ApiResponseResult(Boolean)
  public async delete(@Param('uuid') uuid: string) {
    const res = await this.service.remove(uuid);
    return R.ok(res.affected != null && res.affected > 0);
  }

  @Put('update/:uuid')
  @ApiOperation({ description: '修改用户', tags: ['用户'] })
  @ApiResponseResult(Boolean)
  public async update(@Body() dto: UserUpdateDto, @Param('uuid') uuid: string) {
    const res = await this.service.update(
      uuid,
      plainToInstance(UserUpdateDto, dto) as any,
    );
    return R.ok(res.affected != null && res.affected > 0);
  }

  @Post('save')
  @ApiOperation({ description: '添加用户', tags: ['用户'] })
  @ApiResponseResult(UserVo)
  public async save(@Body() dto: UserSaveDto) {
    const user = await this.service.save(dto);
    return R.ok(instanceToPlain(user));
  }
}
