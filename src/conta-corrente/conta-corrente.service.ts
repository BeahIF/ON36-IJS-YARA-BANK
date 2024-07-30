import { Injectable } from '@nestjs/common';
import { ContaCorrente } from '../conta.model';

@Injectable()
export class ContaCorrenteService {
  private contas: ContaCorrente[] = [];

  criarConta(conta: ContaCorrente): void {
    if (conta instanceof ContaCorrente) {
      this.contas.push(conta);
      console.log(
        `Conta ${conta.numeroConta} criada com saldo inicial R$${conta.saldo}`,
      );
    } else {
      throw new Error('Tipo de conta inválido');
    }
  }

  obterConta(numeroConta: number): ContaCorrente | undefined {
    return this.contas.find(
      (conta) => Number(conta.numeroConta) === Number(numeroConta),
    );
  }

  depositar(numeroConta: number, valor: number): void {
    const conta = this.obterConta(numeroConta);
    console.log(typeof conta);
    if (conta) {
      conta.depositar(valor);
    }
  }

  sacar(numeroConta: number, valor: number): boolean {
    const conta = this.obterConta(numeroConta);
    if (conta) {
      return conta.sacar(valor);
    }
    return false;
  }

  transferir(
    numeroContaOrigem: number,
    numeroContaDestino: number,
    valor: number,
  ): boolean {
    const contaOrigem = this.obterConta(numeroContaOrigem);
    const contaDestino = this.obterConta(numeroContaDestino);
    if (contaOrigem && contaDestino) {
      return contaOrigem.transferir(valor, contaDestino);
    }
    return false;
  }
}
