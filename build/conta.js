"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaPoupanca = exports.ContaCorrente = void 0;
class ContaBancaria {
    constructor(numeroConta, saldo = 0) {
        this.numeroConta = numeroConta;
        this.saldo = saldo;
    }
    depositar(valor) {
        // aqui eu já devo fazer algum codigo?
    }
    sacar(valor) {
        // aqui eu já devo fazer algum codigo?
        if (valor > this.saldo) {
            console.log('Saldo insuficiente');
            return false;
        }
        this.saldo -= valor;
        return true;
    }
    transferir(valor, contaDestino) {
        // aqui eu já devo fazer algum codigo?
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
}
class ContaCorrente extends ContaBancaria {
    constructor(numeroConta, saldo = 0, limiteChequeEspecial) {
        super(numeroConta, saldo);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    sacar(valor) {
        // aqui eu já devo fazer algum codigo?
        if (valor > this.saldo + this.limiteChequeEspecial) {
            console.log('Saldo insuficiente, incluindo limite do cheque especial');
            return false;
        }
        this.saldo -= valor;
        return true;
    }
}
exports.ContaCorrente = ContaCorrente;
class ContaPoupanca extends ContaBancaria {
    constructor(numeroConta, saldo = 0, taxaJuros) {
        super(numeroConta, saldo);
        this.taxaJuros = taxaJuros;
    }
    aplicarJuros() {
        // aqui eu já devo fazer algum codigo?
    }
}
exports.ContaPoupanca = ContaPoupanca;
