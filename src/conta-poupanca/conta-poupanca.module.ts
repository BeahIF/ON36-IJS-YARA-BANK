import { Module } from '@nestjs/common';
import { ContaPoupancaController } from './conta-poupanca.controller';
import { ContaPoupancaService } from './conta-poupanca.service';
@Module({
  controllers: [ContaPoupancaController],
  providers: [ContaPoupancaService],
})
export class ContaPoupancaModule {}