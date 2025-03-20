import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { instanceToPlain } from 'class-transformer';
import { SignUpDto } from './dto/sign-up.dto';
import { R } from '../../interfaces/r';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  /**
   * 登录
   * @param dto
   */
  public async signIn(dto: SignInDto) {
    const data = await this.usersService.signIn(dto.username, dto.password);
    if (data) {
      const accessToken = await this.jwtService.signAsync({
        id: data.id,
        ...instanceToPlain(data),
      });

      // const key = `geckoai.access.token:${data.id}:${data.username}`;
      // this.redis.set(key, accessToken);
      // this.redis.expire(key, Number(process.env.SESSION_EXPIRES_IN));
      return 'Bearer ' + accessToken;
    }
    return null;
  }

  /**
   * 注册用户
   * @param dto
   */
  public async signUp(dto: SignUpDto) {
    const { password, ...rest } = dto;
    const user = await this.usersService.save({
      password,
      ...rest,
    });

    await this.mailService.send(user.uuid, {
      to: [user.email],
      subject: 'Please Confirm Your Email address.',
    });

    return R.ok(user.uuid);
  }
}
