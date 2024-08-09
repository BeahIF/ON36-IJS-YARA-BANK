import { Cliente } from './cliente/cliente.model';
import { Gerente } from './gerente/gerente.model';

export interface IContaBancaria {
  numeroConta: number;
  saldo: number;
  cliente: Cliente;
  gerente: Gerente;
  depositar(valor: number): void;
  sacar(valor: number): boolean;
  transferir(valor: number, contaDestino: IContaBancaria): boolean;
}

abstract class ContaBancaria implements IContaBancaria {
  constructor(
    public numeroConta: number,
    public saldo: number = 0,
    public cliente: Cliente,
    public gerente: Gerente,
  ) {}

  associarCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }
  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error('O valor de depósito deve ser maior que zero.');
    }
    this.saldo += valor;
    console.log(
      `Depósito de R$${valor} realizado. Saldo atual: R$${this.saldo}`,
    );
  }

  sacar(valor: number): boolean {
    if (valor > this.saldo) {
      console.log('Saldo insuficiente');
      return false;
    }
    this.saldo -= valor;
    return true;
  }

  transferir(valor: number, contaDestino: IContaBancaria): boolean {
    if (this.sacar(valor)) {
      contaDestino.depositar(valor);
      return true;
    }
    return false;
  }
}

export class ContaCorrente extends ContaBancaria {
  constructor(
    numeroConta: number,
    public limiteChequeEspecial: number,
    cliente: Cliente,
    gerente: Gerente,
  ) {
    super(numeroConta, 0, cliente, gerente);
  }
}

export class ContaPoupanca extends ContaBancaria {
  constructor(
    numeroConta: number,
    saldo = 0,
    public taxaJuros: number,
    cliente: Cliente,
    gerente: Gerente,
  ) {
    super(numeroConta, saldo, cliente, gerente);
  }

  aplicarJuros(): void {
    this.saldo += this.saldo * (this.taxaJuros / 100);
  }
}
