console.log('Olá TypeScript')

import { Cliente } from './cliente';
import { ContaCorrente, ContaPoupanca } from './conta';

console.log('Iniciando a aplicação...');
const cliente1 = new Cliente(1, "João da Silva", "Rua A, 123", "12345-6789");
console.log(cliente1)
const contaCorrente1 = new ContaCorrente(1001, 500, 1000);
console.log(contaCorrente1)
const contaPoupanca1 = new ContaPoupanca(2001, 1000, 0.5);
console.log(contaPoupanca1)
cliente1['contas'] = [contaCorrente1, contaPoupanca1]; 
console.log(cliente1)
contaCorrente1.depositar(200);
console.log(contaCorrente1)

contaCorrente1.sacar(100);
console.log(contaCorrente1)
contaCorrente1.transferir(200, contaPoupanca1);
contaPoupanca1.aplicarJuros();

console.log(contaCorrente1);
console.log(contaPoupanca1);