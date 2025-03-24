import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponseResult } from '../decorators';
import { R } from '../../interfaces/r';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ description: '登录', tags: ['身份验证'] })
  @ApiResponseResult(String)
  async signIn(@Body() dto: SignInDto) {
    const res = await this.service.signIn(dto);
    if (res) {
      return R.ok(res);
    }
    return R.error(
      'ER_SIGN_IN',
      401,
      'Please check if your account and password are filled in correctly.',
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @ApiOperation({ description: '注册', tags: ['身份验证'] })
  @ApiResponseResult(String)
  async signUp(@Body() dto: SignUpDto) {
    const res = await this.service.signUp(dto);
    if (res) return R.ok(res);
    return R.error(
      'ER_SIGN_IN',
      401,
      'Please check if your account and password are filled in correctly.',
    );
  }
}
