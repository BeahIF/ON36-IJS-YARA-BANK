import { Module } from '@nestjs/common';
import { ContaPoupancaController } from './adapters/inbound/conta-poupanca.controller';
import { ContaPoupancaService } from './application/conta-poupanca.service';
@Module({
  controllers: [ContaPoupancaController],
  providers: [ContaPoupancaService],
})
export class ContaPoupancaModule {}