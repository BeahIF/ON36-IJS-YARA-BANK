import { Module } from '@nestjs/common';
import { ContaCorrenteController } from './conta-corrente.controller';
import { ContaCorrenteService } from './conta-corrente.service';
@Module({
  controllers: [ContaCorrenteController],
  providers: [ContaCorrenteService],
})
export class ContaCorrenteModule {}
