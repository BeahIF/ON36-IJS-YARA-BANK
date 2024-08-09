import { Cliente } from 'src/cliente/cliente.model';
import { ContaCorrente, ContaPoupanca, IContaBancaria } from './../conta.model';

export class Gerente {
  constructor(public id: number, public nome: string) {}

  adicionarCliente(cliente: Cliente, clientes: Cliente[]): void {
    clientes.push(cliente);
  }

  removerCliente(idCliente: number, clientes: Cliente[]): boolean {
    const index = clientes.findIndex((cliente) => cliente.id === idCliente);
    if (index !== -1) {
      clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  abrirConta(
    cliente: Cliente,
    tipo: 'corrente' | 'poupanca',
    numeroConta: number,
    saldo: number,
    gerente: Gerente,
    limiteChequeEspecial?: number,
    taxaJuros?: number,
  ): void {
    let conta: IContaBancaria;
    if (tipo === 'corrente') {
      conta = new ContaCorrente(
        numeroConta,
        limiteChequeEspecial || 0,
        cliente,
        gerente,
      );
    } else {
      conta = new ContaPoupanca(
        numeroConta,
        saldo,
        taxaJuros || 0,
        cliente,
        gerente,
      );
    }
    cliente.adicionarConta(conta);
  }

  fecharConta(cliente: Cliente, numeroConta: number): boolean {
    return cliente.removerConta(numeroConta);
  }

}
