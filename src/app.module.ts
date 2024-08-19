import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { ContaCorrenteController } from './conta-corrente/adapters/inbound/conta-corrente.controller';
import { ContaPoupancaController } from './conta-poupanca/adapters/inbound/conta-poupanca.controller';
import { ClienteController } from './cliente/adapters/inbound/cliente.controller';
import { ContaCorrenteService } from './conta-corrente/applications/conta-corrente.service';
import { ContaPoupancaService } from './conta-poupanca/application/conta-poupanca.service';
import { GerenteService } from './gerente/application/gerente.service';
import { ContaCorrenteModule } from './conta-corrente/conta-corrente.module';
import { ClienteService } from './cliente/application/cliente.service';
import { GerenteController } from './gerente/adapters/inbound/gerente.controller';
import { GeolocationAdapter } from './conta-corrente/adapters/geolocation/geolocation.adapter';

@Module({
  imports: [ContaCorrenteModule],
  controllers: [
    ContaCorrenteController,
    ContaPoupancaController,
    ClienteController,GerenteController
  ],
  providers: [  ContaCorrenteService,
    ContaPoupancaService,
    GerenteService,ClienteService,GeolocationAdapter],
})
export class AppModule {}
