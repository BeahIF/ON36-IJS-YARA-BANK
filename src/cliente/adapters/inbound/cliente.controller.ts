import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cliente } from '../outbound/cliente.model';
import { ClienteService } from 'src/cliente/application/cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/criar')
  async criarCliente(@Body() clienteDto: { id: number; nome: string }) {
    const cliente = new Cliente(clienteDto.id, clienteDto.nome);
    await this.clienteService.adicionarCliente(cliente);
    return { message: `Cliente ${cliente.nome} criado com sucesso.` };
  }

  @Get('/:id')
  obterCliente(@Param('id') id: number) {
    const cliente = this.clienteService.obterCliente(id);
    return cliente;
  }
}
