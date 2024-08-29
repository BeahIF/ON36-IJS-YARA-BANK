import { Module } from '@nestjs/common';
import { ContaCorrenteController } from './conta-corrente/adapters/inbound/conta-corrente.controller';
import { ContaPoupancaController } from './conta-poupanca/adapters/inbound/conta-poupanca.controller';
import { ClienteController } from './cliente/adapters/inbound/cliente.controller';
import { ContaCorrenteService } from './conta-corrente/applications/conta-corrente.service';
import { ContaPoupancaService } from './conta-poupanca/application/conta-poupanca.service';
import { GerenteService } from './gerente/application/gerente.service';
import { ClienteService } from './cliente/application/cliente.service';
import { GerenteController } from './gerente/adapters/inbound/gerente.controller';
import { GeolocationAdapter } from './conta-corrente/adapters/geolocation/geolocation.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { DbModule } from './db/db.module';
import { ClienteRepository } from './cliente/repository/cliente.repository';
import { ClienteORMRepository } from './cliente/repository/orm/clienteORM.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './db/entities/cliente.entity';

@Module({
  imports: [ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService)=>({
          type: 'postgres', 
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: process.env.DB_PASSWORD,
          database: 'postgres',
          synchronize: true,
          logging: false,
          entities: [ClienteEntity],
      })
    }), ClienteModule],
  // controllers: [
  //   ContaCorrenteController,
  //   ContaPoupancaController,
  //   ClienteController,
  //   GerenteController,
  // ],
  // providers: [
  //   ContaCorrenteService,
  //   ContaPoupancaService,
  //   GerenteService,
  //   ClienteService,
  //   GeolocationAdapter, {provide: ClienteRepository,useClass:ClienteORMRepository}
  // ],
})
export class AppModule {}
