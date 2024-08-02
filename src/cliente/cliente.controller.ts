import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/criar')
  criarCliente(@Body() clienteDto: { id: number; nome: string }) {
    const cliente = new Cliente(clienteDto.id, clienteDto.nome);
    this.clienteService.adicionarCliente(cliente);
    return { message: `Cliente ${cliente.nome} criado com sucesso.` };
  }

  @Get('/:id')
  obterCliente(@Param('id') id: number) {
    const cliente = this.clienteService.obterCliente(id);
    return cliente;
  }
}
