import { Module } from '@nestjs/common';
import { GerenteService } from './application/gerente.service';
import { GerenteController } from './adapters/inbound/gerente.controller';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService],
})
export class GerenteModule {}
