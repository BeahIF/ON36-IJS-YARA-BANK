import { Module } from '@nestjs/common';
import { GerenteService } from './application/gerente.service';
import { GerenteController } from './adapters/inbound/gerente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/db/entities/gerente.entity';
import { GerenteRepository } from './repository/gerente.repository';
import { GerenteORMRepository } from './repository/orm/gerenteORM.repository';

@Module({
  imports:[TypeOrmModule.forFeature([GerenteEntity])],
  controllers: [GerenteController],
  providers: [GerenteService, {provide:GerenteRepository, useClass:GerenteORMRepository}],
})
export class GerenteModule {}
