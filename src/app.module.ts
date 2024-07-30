import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaCorrenteModule } from './conta-corrente/conta-corrente.module';
import { ContaPoupancaModule } from './conta-poupanca/conta-poupanca.module';

@Module({
  imports: [ContaCorrenteModule, ContaPoupancaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
