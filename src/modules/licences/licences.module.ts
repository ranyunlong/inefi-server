import { Global, Module } from '@nestjs/common';
import { LicencesService } from './licences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenceEntity } from './entities/licence.entity';
import { LicencesController } from './licences.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LicenceEntity])],
  controllers: [LicencesController],
  providers: [LicencesService],
})
export class LicencesModule {}
