import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    // 速率限制
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    // 任务调度
    ScheduleModule.forRoot(),
    // 事件总线
    EventEmitterModule.forRoot(),
    // 数据库
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        url: process.env.MYSQL_URL,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    MailModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
