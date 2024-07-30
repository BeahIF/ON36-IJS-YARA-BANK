export interface IContaBancaria {
  numeroConta: number;
  saldo: number;
  // aqui deve ir um clientId?
  depositar(valor: number): void;
  sacar(valor: number): boolean;
  transferir(valor: number, contaDestino: IContaBancaria): boolean;
}

abstract class ContaBancaria implements IContaBancaria {
  constructor(public numeroConta: number, public saldo: number = 0) {}

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
    // aqui eu já devo fazer algum codigo?
    if (valor > this.saldo) {
      console.log('Saldo insuficiente');
      return false;
    }
    this.saldo -= valor;
    return true;
  }

  transferir(valor: number, contaDestino: IContaBancaria): boolean {
    // aqui eu já devo fazer algum codigo?
    if (this.sacar(valor)) {
      contaDestino.depositar(valor);
      return true;
    }
    return false;
  }
}

export class ContaCorrente extends ContaBancaria {
  constructor(numeroConta: number, public limiteChequeEspecial: number) {
    super(numeroConta);
  }

  // sacar(valor: number): boolean {
  // aqui eu já devo fazer algum codigo?
  // }
}

export class ContaPoupanca extends ContaBancaria {
  constructor(numeroConta: number, saldo = 0, public taxaJuros: number) {
    super(numeroConta, saldo);
  }

  aplicarJuros(): void {
    // aqui eu já devo fazer algum codigo?
  }
}
