import { Module } from '@nestjs/common';
import { ClienteController } from './adapters/inbound/cliente.controller';
import { ClienteService } from './application/cliente.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
