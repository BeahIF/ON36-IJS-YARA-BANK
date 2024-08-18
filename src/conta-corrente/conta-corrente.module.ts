import { Module } from '@nestjs/common';
import { ContaCorrenteController } from './adapters/inbound/conta-corrente.controller';
import { ContaCorrenteService } from './applications/conta-corrente.service';
import { ClienteService } from 'src/cliente/application/cliente.service';
import { GerenteService } from 'src/gerente/application/gerente.service';
import { GeolocationAdapter } from './adapters/geolocation/geolocation.adapter';
@Module({
  controllers: [ContaCorrenteController],
  providers: [ContaCorrenteService, ClienteService, GerenteService, GeolocationAdapter],
})
export class ContaCorrenteModule {}
