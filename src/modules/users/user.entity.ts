import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsInt } from 'class-validator';

@Entity('sys_users')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户主键' })
  public id: string;

  @Column({ type: 'uuid', comment: 'uuid', unique: true })
  @ApiProperty({ description: 'uuid', required: true })
  public uuid: string;

  @Column({ type: 'varchar', length: 255, comment: '邮箱', unique: true })
  @ApiProperty({ description: '邮箱', required: true })
  @IsEmail()
  public email: string;

  @Column({ type: 'varchar', length: 255, comment: '账号', unique: true })
  @ApiProperty({ description: '账号', required: true })
  public username: string;

  @Column({ type: 'varchar', length: 255, comment: '手机', unique: true })
  @ApiProperty({ description: '手机', required: false })
  public phone: string;

  @Column({
    type: 'int',
    comment: '性别:  0: 女; 1.男; 2: 其他;',
    default: 2,
  })
  @ApiProperty({
    description: '性别:  0: 女; 1.男; 2: 其他;',
    required: false,
    enum: [0, 1, 2],
  })
  public gender: number;

  @Column({ type: 'varchar', length: 255, comment: '昵称', nullable: true })
  @ApiProperty({ description: '昵称', required: false })
  public nickname?: string;

  @Column({ type: 'varchar', length: 255, comment: '头像', nullable: true })
  @ApiProperty({ description: '头像', required: false })
  public avatar?: string;

  @Column({ type: 'varchar', length: 255, comment: '密码' })
  @ApiProperty({ description: '密码', required: true })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Column({
    type: 'int',
    comment: '创建人ID',
    name: 'create_id',
    nullable: true,
  })
  @ApiProperty({ description: '创建人ID', required: false })
  @Type()
  @IsInt()
  public createId: number;

  @Column({
    type: 'int',
    comment:
      '激活状态: 0.未激活; 1.激活中; 2.激活失败; 3.需要重新激活; 4.激活成功; -1.禁用',
    default: 0,
  })
  @ApiProperty({
    description:
      '激活状态: 0.未激活; 1.激活中; 2.激活失败; 3.需要重新激活; 4.激活成功; -1.禁用',
    required: false,
    enum: [-1, 0, 1, 2, 3, 4],
  })
  @Type()
  public status: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '修改时间',
    nullable: true,
    name: 'update_at',
  })
  updateAt?: Date;
}
