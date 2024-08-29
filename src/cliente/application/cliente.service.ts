import { Injectable, NotFoundException } from '@nestjs/common';
import { IContaBancaria } from 'src/conta.model';
import { Cliente } from '../adapters/outbound/cliente.model';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import{v4 as uuid} from 'uuid'
import { ClienteRepository } from '../repository/cliente.repository';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository){}
  async adicionarCliente(cliente: Cliente) {
    const clienteToSave: ClienteEntity = {
      nome: cliente.nome,
      id: uuid(),
      contas: []
    }

    const createdCliente = await this.clienteRepository.save(clienteToSave);
    return createdCliente
  }


  async obterCliente(id: number): Promise<Cliente|ClienteEntity> {
    const cliente = await this.clienteRepository.findOne(id);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }
  obterContas(clienteId: number): IContaBancaria[] {
    const cliente = this.obterCliente(clienteId);
    return (cliente as unknown as Cliente).contas;
  }

  obterConta(clienteId: number, numeroConta: number): IContaBancaria {
    const cliente = this.obterCliente(clienteId);
    const conta = (cliente as unknown as Cliente).contas.find((c) => c.numeroConta === numeroConta);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    return conta;
  }

  adicionarConta(clienteId: number, conta: IContaBancaria): void {
    const cliente = this.obterCliente(clienteId);
    (cliente as unknown as Cliente).contas.push(conta);
  }

  removerConta(clienteId: number, numeroConta: number): void {
    const cliente = this.obterCliente(clienteId);
    (cliente as unknown as Cliente).contas = (cliente as unknown as Cliente).contas.filter(
      (c) => c.numeroConta !== numeroConta,
    );
  }
}
