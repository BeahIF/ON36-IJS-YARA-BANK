import { Module } from '@nestjs/common';
import { ClienteController } from './adapters/inbound/cliente.controller';
import { ClienteService } from './application/cliente.service';
import { ClienteEntity } from '../db/entities/cliente.entity';
import { ClienteRepository } from './repository/cliente.repository';
import { ClienteORMRepository } from './repository/orm/clienteORM.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])], 
  controllers: [ClienteController],
  providers: [ClienteService,  {provide: ClienteRepository,useClass:ClienteORMRepository}],
})
export class ClienteModule {}
// provide é o tipo, useClass é a implementacao