import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

@Entity('sys_devices')
export class DeviceEntity {
  @PrimaryGeneratedColumn({ comment: '设备主键' })
  public id: string;

  @Index()
  @Column({ type: 'uuid', comment: 'uuid', unique: true })
  @ApiProperty({ description: 'uuid', required: true })
  public uuid: string;

  @Column({ type: 'varchar', length: 255, comment: '设备名称', nullable: true })
  @ApiProperty({ description: '设备名称', required: false })
  public name: string;

  @Column({ type: 'varchar', length: 255, comment: '序列号', nullable: true })
  @ApiProperty({ description: '序列号', required: false })
  public sn: string;

  @Column({ type: 'varchar', length: 255, comment: 'licence', nullable: true })
  @ApiProperty({ description: 'licence', required: false })
  public licence: string;

  @Column({ type: 'varchar', length: 255, comment: 'ip地址', nullable: true })
  @ApiProperty({ description: 'ip地址', required: false })
  public ipAddress: string;

  @Column({ type: 'varchar', length: 255, comment: 'mac地址', nullable: true })
  @ApiProperty({ description: 'mac地址', required: false })
  public macAddress: string;

  @Index()
  @Column({ type: 'bigint', comment: '所属边缘设备', nullable: true })
  @ApiProperty({ description: '所属边缘设备', required: false })
  public edgeId: number;

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
  public status: number;

  @Column({
    type: 'int',
    comment: '创建人ID',
    name: 'create_id',
  })
  @IsInt()
  public createId: number;

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
