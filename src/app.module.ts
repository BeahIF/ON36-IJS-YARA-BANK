import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { ContaCorrenteController } from './conta-corrente/conta-corrente.controller';
import { ContaPoupancaController } from './conta-poupanca/conta-poupanca.controller';
import { ClienteController } from './cliente/cliente.controller';
import { GerenteController } from './gerente/gerente.controller';
import { ContaCorrenteService } from './conta-corrente/conta-corrente.service';
import { ContaPoupancaService } from './conta-poupanca/conta-poupanca.service';
import { ClienteService } from './cliente/cliente.service';
import { GerenteService } from './gerente/gerente.service';

@Module({
  imports: [],
  controllers: [
    ContaCorrenteController,
    ContaPoupancaController,
    ClienteController,
    GerenteController,
  ],
  providers: [  ContaCorrenteService,
    ContaPoupancaService,
    ClienteService,
    GerenteService,],
})
export class AppModule {}
