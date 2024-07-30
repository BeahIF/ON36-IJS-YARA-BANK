import { Injectable } from '@nestjs/common';
import { ContaPoupanca } from 'src/conta.model';

@Injectable()
export class ContaPoupancaService {
  private contas: ContaPoupanca[] = [];

  criarConta(conta: ContaPoupanca): void {
    this.contas.push(conta);
  }

  obterConta(numeroConta: number): ContaPoupanca | undefined {
    console.log(this.contas);
    return this.contas.find(
      (conta) => Number(conta.numeroConta) === Number(numeroConta),
    );
  }

  depositar(numeroConta: number, valor: number): void {
    const conta = this.obterConta(numeroConta);
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
