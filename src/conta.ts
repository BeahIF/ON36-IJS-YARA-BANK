
export interface IContaBancaria {
    numeroConta: number;
    saldo: number;
    // aqui deve ir um clientId?
    depositar(valor: number): void;
    sacar(valor: number): boolean;
    transferir(valor: number, contaDestino: IContaBancaria): boolean;
}


abstract class ContaBancaria implements IContaBancaria {
    constructor(
        public numeroConta: number,
        public saldo: number = 0
    ) {}

    depositar(valor: number): void {
        // aqui eu já devo fazer algum codigo?
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
    constructor(
        numeroConta: number,
        saldo: number = 0,
        public limiteChequeEspecial: number
    ) {
        super(numeroConta, saldo);
    }

    sacar(valor: number): boolean {
                      // aqui eu já devo fazer algum codigo?
                    

    }
}

export class ContaPoupanca extends ContaBancaria {
    constructor(
        numeroConta: number,
        saldo: number = 0,
        public taxaJuros: number
    ) {
        super(numeroConta, saldo);
    }

    aplicarJuros(): void {
                        // aqui eu já devo fazer algum codigo?

    }
}