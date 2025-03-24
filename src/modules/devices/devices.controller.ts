import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
import { DeviceVo } from './vos/device.vo';
import { DevicesService } from './devices.service';
import { ApiResponsePageResult } from '../decorators';
import { R } from '../../interfaces/r';
import { DevicePageDto } from './dto/device.page.dto';

@Controller({ path: 'devices' })
@ApiOkResponse({ description: 'Ok' })
@ApiCreatedResponse({ description: 'Created' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiExtraModels(DeviceVo)
@UseGuards(AuthGuard)
export class DevicesController {
  constructor(private service: DevicesService) {}

  @Get('list')
  @ApiOperation({ description: '设备列表', tags: ['设备管理'] })
  @ApiResponsePageResult(DeviceVo)
  public async list(@Query() params: DevicePageDto) {
    const data = await this.service.findPage(params);
    return R.page(data);
  }
}
