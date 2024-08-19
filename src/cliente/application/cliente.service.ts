import { Injectable, NotFoundException } from '@nestjs/common';
import { IContaBancaria } from 'src/conta.model';
import { Cliente } from '../adapters/outbound/cliente.model';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  adicionarCliente(cliente: Cliente): Cliente {
    this.clientes.push(cliente);
    return cliente;
  }

  obterCliente(id: number): Cliente {
    const cliente = this.clientes.find((c) => Number(c.id) === Number(id));
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  obterContas(clienteId: number): IContaBancaria[] {
    const cliente = this.obterCliente(clienteId);
    return cliente.contas;
  }

  obterConta(clienteId: number, numeroConta: number): IContaBancaria {
    const cliente = this.obterCliente(clienteId);
    const conta = cliente.contas.find((c) => c.numeroConta === numeroConta);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    return conta;
  }

  adicionarConta(clienteId: number, conta: IContaBancaria): void {
    const cliente = this.obterCliente(clienteId);
    cliente.contas.push(conta);
  }

  removerConta(clienteId: number, numeroConta: number): void {
    const cliente = this.obterCliente(clienteId);
    cliente.contas = cliente.contas.filter(
      (c) => c.numeroConta !== numeroConta,
    );
  }
}
