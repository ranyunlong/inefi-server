import { Exclude } from 'class-transformer';
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

@Entity('sys_licences')
export class LicenceEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ comment: '边缘网管主键' })
  public id: string;

  @Index()
  @Column({ type: 'uuid', comment: 'uuid', unique: true })
  @ApiProperty({ description: 'uuid', required: true })
  public uuid: string;

  @Column({ type: 'varchar', length: 255, comment: '序列号' })
  public serialNumber: string;

  @Column({ type: 'int', comment: '有效天数' })
  public days: number;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'text', comment: '公钥', nullable: true })
  public publicPem: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'text', comment: '私钥', nullable: true })
  public privatePem: string;

  @Column({ type: 'text', comment: 'x501', nullable: true })
  public x509pem: string;

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
