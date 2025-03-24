import { Module } from '@nestjs/common';
import { EdgesController } from './edges.controller';
import { EdgesService } from './edges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeEntity } from './entities/edge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EdgeEntity])],
  controllers: [EdgesController],
  providers: [EdgesService],
  exports: [EdgesService],
})
export class EdgesModule {}
