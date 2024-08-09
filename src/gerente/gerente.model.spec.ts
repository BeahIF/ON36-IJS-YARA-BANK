import { Gerente } from './gerente.model';
import { Cliente } from '../cliente/cliente.model';
import { ContaCorrente, ContaPoupanca } from '../conta.model';

describe('Gerente', () => {
  let gerente: Gerente;
  let clientes: Cliente[];

  beforeEach(() => {
    gerente = new Gerente(1, 'Carlos');
    clientes = [];
  });

  it('deve adicionar um cliente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    gerente.adicionarCliente(cliente, clientes);

    expect(clientes.length).toBe(1);
    expect(clientes[0]).toBe(cliente);
  });

  it('deve remover um cliente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    gerente.adicionarCliente(cliente, clientes);

    const foiRemovido = gerente.removerCliente(1, clientes);
    expect(foiRemovido).toBe(true);
    expect(clientes.length).toBe(0);
  });

  it('não deve remover um cliente inexistente', () => {
    const foiRemovido = gerente.removerCliente(999, clientes);
    expect(foiRemovido).toBe(false);
  });

  it('deve abrir uma conta corrente para um cliente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    gerente.abrirConta(cliente, 'corrente', 123, 1000, gerente, 500);

    expect(cliente.contas.length).toBe(1);
    expect(cliente.contas[0]).toBeInstanceOf(ContaCorrente);
  });

  it('deve abrir uma conta poupança para um cliente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    gerente.abrirConta(cliente, 'poupanca', 123, 1000, gerente, 0, 0.5);

    expect(cliente.contas.length).toBe(1);
    expect(cliente.contas[0]).toBeInstanceOf(ContaPoupanca);
  });

  it('deve fechar uma conta do cliente', () => {
    const cliente = new Cliente(1, 'Beatriz');
    gerente.abrirConta(cliente, 'corrente', 123, 1000, gerente, 500);

    const foiFechada = gerente.fecharConta(cliente, 123);
    expect(foiFechada).toBe(true);
    expect(cliente.contas.length).toBe(0);
  });
});
